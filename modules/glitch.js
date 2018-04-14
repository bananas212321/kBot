/* eslint-disable no-console, no-undef */
const express = require('express');
const app = express();

app.get('/', (request, response) => {
	console.info(`${Date.now()} Ping Received`);
	response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
