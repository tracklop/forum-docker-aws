// NOTE - Imports
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import Database from './database/index.js';
import {
	handleNotFound,
	handleServerError,
} from './middlewares/index.middleware.js';
import routes from './routes/index.js';

const app = express();

// NOTE - Middleware
app.use(
	session({
		secret: process.env.SECRET,
		cookie: { maxAge: 3600000 },
		resave: false,
		saveUninitialized: true,
	})
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach((router) => {
	app.use(router);
	console.log(`Routes montées depuis ${router.routerName || 'un fichier'}:`);
	router.stack.forEach((layer) => {
		if (layer.route) {
			console.log(`   - ${layer.route.path}`);
		}
	});
});

app.use(handleNotFound);
app.use(handleServerError);

// NOTE - Init Database
try {
	await Database.connect();
	Database.init();
} catch (err) {
	console.error(`# Failed to start DB:\n\n${err}`);
}

// NOTE - Start server
try {
	const listener = await app.listen(process.env.PORT || 3000);
	console.log(
		`# Server started successfully.\n# Listening on port ${
			listener.address().port
		}.`
	);
} catch (err) {
	console.error(`# Failded to start server:\n\n${err}`);
}
