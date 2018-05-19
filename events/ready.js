/* eslint-disable no-console */
module.exports = async (client) => {
  	console.log('\u200b');
	client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');
	console.log('\u200b');
	let guilds = client.guilds.array();
	guilds.forEach(guild => {
		client.logger.debug(`Name: ${guild.name}, ID: ${guild.id}, Avalible?: ${guild.available}`);
	});
	console.log('\u200b');
	try {
		client.user.setActivity(`k!help | ${client.users.size} users in ${client.channels.size} channels for ${client.guilds.size} guilds`, {
			type: 'LISTENING'
		});
		const http = require('http');
		const express = require('express');
		const app = express();

		app.get('/', (request, response) => {
			client.logger.debug('PING');
			response.sendStatus(200);
		});

		app.listen(process.env.PORT);

		setInterval(() => {
			http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
		}, 270000);
	} catch (e) {
		return client.logger.error(e);
	}
};