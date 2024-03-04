// NOTE - Imports
import 'dotenv/config';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

// NOTE - Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/thread', (req, res) => res.send("I'm the thread"));

app.get('/thread/get-messages', (req, res) =>
	fetch('/messages', {
		method: 'GET',
		redirect: 'follow',
	})
		.then((response) => response.text())
		.then((result) => res.send(result))
		.catch((error) => res.send(error))
);

// NOTE - Start server
try {
	const listener = await app.listen(process.env.PORT || 80);
	console.log(
		`# Server started successfully.\n# Listening on port ${
			listener.address().port
		}.`
	);
} catch (err) {
	console.error(`# Failded to start server:\n\n${err}`);
}
