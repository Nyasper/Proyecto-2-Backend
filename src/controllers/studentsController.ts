import { connectMongoDB } from '../db/mongo';
import Student from '../db/studentModel';
import { FastifyRequest, FastifyReply } from 'fastify';
import { manageParamQuery, manageParamUrl } from './categories';

connectMongoDB();

export async function getAllCharas(
	req: FastifyRequest<{ Querystring: { limit?: number } }>,
	res: FastifyReply
) {
	try {
		let charas = [];
		if (req.query.limit && req.query.limit > 0) {
			charas = await Student.find({})
				.limit(req.query.limit)
				.sort({ school: 1, name: 1 });
		} else {
			charas = await Student.find({}).sort({ school: 1, name: 1 });
		}

		if (!charas) {
			throw new Error('Error trying getting all charas');
		}
		return res.status(200).send(charas);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}

export async function getCharaByCharaName(
	req: FastifyRequest<{ Params: { charaName: string } }>,
	res: FastifyReply
) {
	try {
		const { charaName } = req.params;
		const chara = await Student.findOne({ charaName });
		if (!chara) {
			return res.status(404).send({ message: 'character not found' });
		}
		return res.send(chara);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}

export async function categoryController(
	req: FastifyRequest<{
		Querystring: { value: string };
		Params: { categoryName: string };
	}>,
	res: FastifyReply
) {
	const existParams = Object.keys(req.query).length > 0;

	if (existParams) {
		return await manageParamQuery(req, res, Student);
	}
	if (req.params.categoryName) {
		return await manageParamUrl(req, res, Student);
	}
	return res.status(400).send({ message: 'Bad Request' });
}

export async function getAllSchoolsNames(
	req: FastifyRequest,
	res: FastifyReply
) {
	try {
		const schools = await Student.find({}).sort({ name: 1 }).distinct('school');
		if (!schools) {
			throw new Error('Error trying getting all schools');
		}
		return res.status(200).send(schools);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}
