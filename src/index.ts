import Fastify from 'fastify';
import charaRoutes from './routes/charaRoutes';

const app = Fastify();

app.register(charaRoutes, { prefix: '/api/chara' });

async function run() {
	try {
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}
run();
