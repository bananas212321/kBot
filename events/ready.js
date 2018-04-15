/* eslint-disable no-console */
module.exports = client => {
	client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');
	console.log('');
	client.user.setActivity(`${client.config.defaultSettings.prefix}status`, {
		type: 'LISTENING'
	});
};