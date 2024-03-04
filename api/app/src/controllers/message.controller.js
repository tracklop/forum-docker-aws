// NOTE - Imports
import { Op } from 'sequelize';
import GetMessages from '../models/message.model.js';
import Message from '../models/message.model.js';

export const GetMessages = async (req, res) => {
	const { count, rows: messages } = await Message.findAndCountAll();

	return count
		? res.status(200).send(messages)
		: res
				.status(404)
				.json({ status: 404, message: 'there is no messages' });
};

export const WriteMessage = async (req, res) => {
	await Message.create(req.body);
};

export default {
	GetMessages,
	WriteMessage,
};
