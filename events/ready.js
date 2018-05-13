/* eslint-disable no-console */
module.exports = async (client) => {
	client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');
	console.log('');
	try {
		return client.user.setActivity(`k!help | ${client.users.size} users in ${client.channels.size} channels for ${client.guilds.size} guilds`, {
			type: 'LISTENING'
		});
	} catch (e) {
		return client.logger.error(e);
	}
};