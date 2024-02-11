import { FastifyInstance } from 'fastify';
import {
	getAllCharas,
	getCharaByCharaName,
	getAllSchoolsNames,
	getOneSchoolCharas,
	getCategoryByQueryParam,
} from '../controllers/studentsController';

export default async function charaRoutes(app: FastifyInstance) {
	app.get('/', () => {
		return 'Proyecto 2 BACKEND';
	});

	app.get('/all', getAllCharas);

	app.get('/:charaName', getCharaByCharaName);

	app.get('/schools/all', getAllSchoolsNames);

	app.get('/schools/:schoolName', getOneSchoolCharas);

	app.get('/category', getCategoryByQueryParam);
}
