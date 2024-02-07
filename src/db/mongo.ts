import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export async function connectMongoDB() {
	if (process.env.URI) {
		try {
			await mongoose.connect(process.env.URI);
			console.log(`Connected success to MongoDB`);
		} catch (error) {
			console.log(error);
		}
	} else console.error('ENV file Missing');
}
