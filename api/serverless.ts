import app from '../src';
import { FastifyRequest, FastifyReply } from 'fastify';

export default async (req: FastifyRequest, res: FastifyReply) => {
	await app.ready();
	app.server.emit('request', req, res);
};
