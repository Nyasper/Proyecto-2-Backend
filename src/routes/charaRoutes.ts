import { FastifyInstance } from 'fastify';
import {
	getAllCharas,
	getCharaByCharaName,
	getAllSchoolsNames,
	categoryController,
} from '../controllers/studentsController';
import { getAllCategoryes } from '../controllers/categories';

export default async function charaRoutes(app: FastifyInstance) {
	app.get('/', () => {
		return 'Proyecto 2 BACKEND';
	});

	app.get('/all', getAllCharas);

	app.get('/:charaName', getCharaByCharaName);

	app.get('/category/all', getAllCategoryes);

	app.get('/category/:categoryName', categoryController);
}
