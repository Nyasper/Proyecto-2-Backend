import { FastifyRequest, FastifyReply } from 'fastify';
import { Model } from 'mongoose';

const filtredCategories = [
	'name',
	'age',
	'school',
	'designer',
	'illustrator',
	'voice',
	'role',
	'combatClass',
	'weaponType',
	'skinSet',
];

export async function getAllCategoryes(req: FastifyRequest, res: FastifyReply) {
	try {
		res.send(filtredCategories);
	} catch (error) {
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}

export async function manageParamUrl(
	req: FastifyRequest<{ Params: { categoryName: string } }>,
	res: FastifyReply,
	Student: Model<any>
) {
	try {
		const categoryName = req.params.categoryName.toLowerCase();

		const validCategory = filtredCategories.find((category) =>
			category.toLowerCase().includes(categoryName)
		);

		if (validCategory) {
			const categories = await Student.find({ [validCategory]: { $ne: null } })
				.sort({ school: 1, name: 1 })
				.distinct(validCategory);

			return res.status(200).send(categories);
		}
		return res.status(400).send({ error: 'categoryName not valid.' });
	} catch (error) {
		return res.status(500).send({ error: 'Internal Server Error' });
	}
}

export async function manageParamQuery(
	req: FastifyRequest<{
		Querystring: { value: string };
		Params: { categoryName: string };
	}>,
	res: FastifyReply,
	Student: Model<any>
) {
	try {
		const { value } = req.query;
		const { categoryName } = req.params;

		if (!categoryName || !value) {
			return res.status(400).send({ error: 'category or value not provided' });
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
