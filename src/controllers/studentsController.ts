import { connectMongoDB } from '../db/mongo';
import Student from '../db/studentModel';
import { FastifyRequest, FastifyReply } from 'fastify';

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

export async function getOneSchoolCharas(
	req: FastifyRequest<{ Params: { schoolName: string } }>,
	res: FastifyReply
) {
	try {
		const school = req.params.schoolName;
		const charas = await Student.find({ school }).sort({ school: 1, name: 1 });
		if (!charas || !charas.length) {
			return res
				.status(200)
				.send({ message: `No characters from schoool ${school} founded.` });
		}
		return res.status(200).send(charas);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}

export async function getCategoryByQueryParam(
	req: FastifyRequest<{
		Querystring: { category: string; value: string };
	}>,
	res: FastifyReply
) {
	const categories = [
		'name',
		'age',
		'designer',
		'illustrator',
		'voice',
		'role',
		'combatClass',
		'weaponType',
		'skinSet',
	];
	try {
		const { category, value } = req.query;

		if (!category || !value) {
			return res.status(400).send({ error: 'category or value not provided' });
		}

		const categoryName = categories.find((element) => element === category);

		if (!categoryName) {
			return res
				.status(400)
				.send({ error: 'categoryName invalid or not exists.' });
		}

		const charas = await Student.find({ [categoryName]: value }).sort({
			school: 1,
			name: 1,
		});

		return res.status(200).send(charas);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}
