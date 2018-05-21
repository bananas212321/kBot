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
	} catch (e) {
		return client.logger.error(e);
	}
};