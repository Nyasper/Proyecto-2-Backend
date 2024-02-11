import Fastify from 'fastify';
import cors from '@fastify/cors';
import charaRoutes from './routes/charaRoutes';

const app = Fastify();

app.register(cors, { origin: true, methods: ['GET'] });
app.register(charaRoutes, { prefix: '/api/chara' });

app.get('/', () => 'Proyecto 2 Backend');

async function run() {
	try {
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}
run();
