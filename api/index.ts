import fastify from 'fastify';
import cors from '@fastify/cors';
import search from '../src/routes/search';
import { connectDB } from '../src/db';
import dotenv from 'dotenv';
import { FastifyRequest } from 'fastify';
import rateLimit from '@fastify/rate-limit';

dotenv.config();

// Create server instance
const server = fastify({ logger: true });

// Register plugins
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

// Connect to the database
const dbUri = process.env.DB_URI;
if (dbUri) {
    connectDB(dbUri).catch(console.error);
}

// Export for Vercel serverless function
export default async (req: any, res: any) => {
    await server.ready();
    server.server.emit('request', req, res);
};
