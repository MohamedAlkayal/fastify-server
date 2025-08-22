import fastify from 'fastify';
import search from './routes/search';
import { connectDB } from './db';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

server.register(search);

const start = async () => {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error('DB_URI not found in environment variables');
    }
    await connectDB(dbUri);
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();