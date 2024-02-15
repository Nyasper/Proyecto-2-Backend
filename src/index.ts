import Fastify from 'fastify';
import cors from '@fastify/cors';
import charaRoutes from './routes/charaRoutes';

const app = Fastify();

app.register(cors, { origin: true, methods: ['GET'] });
app.register(charaRoutes, { prefix: '/api/chara' });

app.get('/', () => 'Proyecto 2 Backend');

async function run() {
	try {
		const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
		await app.listen({ port });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}
run();
