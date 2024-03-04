// SECTION[epic=routes] - Message routes

// NOTE - Imports
import { Router } from 'express';

// NOTE - Imports controllers
import {
	GetMessages,
	WriteMessage,
} from '../controllers/message.controller.js';

const messageRouter = Router();

// NOTE - Routes
messageRouter.get('/messages/', GetMessages);
messageRouter.post('/messages/', WriteMessage);

// NOTE - Exporting route
messageRouter.routerName = 'messageRouter';
export default messageRouter;

// !SECTION
