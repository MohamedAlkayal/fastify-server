import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

export default async function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
    return 'Hello World';
  });
}