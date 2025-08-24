import fastify from 'fastify';
import cors from '@fastify/cors';
import search from './routes/search';
import { connectDB } from './db';
import dotenv from 'dotenv';
import { FastifyRequest } from 'fastify';
import rateLimit from '@fastify/rate-limit';

dotenv.config();

const server = fastify({ logger: true });

server.register(cors, {
  origin: process.env.CLIENT_URL || '*',
  credentials: true
});
server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: (req: FastifyRequest, context: any) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${Math.ceil(context.ttl / 1000)} seconds.`
    };
  }
});
server.register(search);

const start = async () => {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error('DB_URI not found in environment variables');
    }
    await connectDB(dbUri);
    await server.listen({ port: 5050, host: '0.0.0.0' });
    console.log('Server is running at http://localhost:5050');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();