/* eslint-disable no-console */
module.exports = client => {
	console.log('\n');
	client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');
	console.log('\n');
	client.user.setActivity(`${client.config.defaultSettings.prefix}help`, {
		type: 'LISTENING'
	});
};