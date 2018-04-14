/* eslint-disable no-console, no-undef */
const express = require('express');
const app = express();
const moment = require('moment');
const chalk = require('chalk');
const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`;


app.get('/', (request, response) => {
	console.log(`${timestamp}: ${chalk.green('PING')}`);
	response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);