import fetch from 'node-fetch';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import CachedSearchResult from '../schemas/CachedSearchResultModel';
import crypto from 'crypto';
import geoip from 'geoip-lite';
import SearchAnalytics from '../schemas/SearchAnalyticsModel';

export default async function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get('/search/podcast', async (request: FastifyRequest, reply: FastifyReply) => {
    const { term, limit = 10, country = 'US' } = request.query as {
      term?: string;
      limit?: number;
      country?: string;
    };

    if (!term) {
      return reply.status(400).send({ error: 'Missing search term' });
    }
    // Get requester IP
    const requesterIp = request.headers['x-forwarded-for']?.toString().split(',')[0].trim() || request.ip;
    const geo = geoip.lookup('102.41.28.134') || {};
    console.log(`Search for ${term} from IP ${requesterIp}, geo: ${JSON.stringify(geo)}`);
    // Save analytics (non-blocking)
    SearchAnalytics.create({
      searchTerm: term,
      requesterIp,
      ...geo,
      timestamp: new Date().toISOString(),
    }).catch(() => {
      console.log('Failed to save analytics');
    });


    // Generate hashKey from query params
    const hashKey = crypto.createHash('sha256')
      .update(JSON.stringify({ term, limit, country }))
      .digest('hex');

    // Caching logic
    const filters = { country };
    const now = new Date();
    const nowMs = now.getTime();
    const initialExpiryMs = 24 * 60 * 60 * 1000; // 24 hours
    const minExpiryMs = 5 * 1000; // 5 seconds
    const decayRate = 0.1; // Best practice: slower decay

    // Try to find cached result by hashKey
    let cached = await CachedSearchResult.findOne({ hashKey });

    if (cached) {
      cached.numberOfHits = (cached.numberOfHits || 0) + 1;
      // Calculate expiry from original timestamp
      const originalTimestampMs = new Date(cached.timestamp).getTime();
      const decayedExpiryMs = initialExpiryMs * Math.exp(-decayRate * cached.numberOfHits);
      const expiryMs = Math.max(originalTimestampMs + decayedExpiryMs, nowMs + minExpiryMs);
      cached.expiryDate = new Date(expiryMs).toISOString();
      await cached.save();
      console.log(`Cache hit for ${term}: ${cached.results.length} results`);
      // Check if cache is still valid
      if (nowMs < new Date(cached.expiryDate).getTime() - minExpiryMs) {
        return reply.send({
          source: 'cache',
          results: cached.results,
        });
      }
      // If expired, continue to fetch new data
    }

    const params = new URLSearchParams({
      term,
      media: 'podcast',
      limit: String(limit),
      country,
    });

    const url = `https://itunes.apple.com/search?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json() as { results: any[] };

    // Set initial expiry date and timestamp
    const timestamp = now.toISOString();
    const expiryDate = new Date(nowMs + initialExpiryMs).toISOString();

    // Cache the result
    await CachedSearchResult.findOneAndUpdate(
      {
        hashKey,
      },
      {
        searchTerm: term,
        resultCount: limit,
        filters,
        results: data.results,
        timestamp,
        expiryDate,
        numberOfHits: 1,
        hashKey,
      },
      { upsert: true }
    );



    return reply.send({
      source: 'itunes',
      results: data.results,
    });
  });
}
