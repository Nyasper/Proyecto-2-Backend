import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
	{
		charaName: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		school: {
			type: String,
			required: true,
		},
		role: {
			type: String,
		},
		combatClass: {
			type: String,
		},
		weaponType: {
			type: String,
		},
		age: {
			type: Number,
			default: null,
		},
		birthday: {
			type: String,
		},
		height: {
			type: Number,
			default: null,
		},
		hobbies: {
			type: String,
		},
		designer: {
			type: String,
		},
		illustrator: {
			type: String,
		},
		voice: {
			type: String,
		},
		releaseDate: {
			type: String,
		},
		skinSet: {
			type: String,
		},
		pageUrl: {
			type: String,
		},
		pageImageProfileUrl: {
			type: String,
		},
		pageImageFullUrl: {
			type: String,
		},
		audioUrl: {
			type: String,
		},
		files: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
	}
);

export default model('Student', studentSchema);
