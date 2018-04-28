/* eslint-disable no-console */
module.exports = client => {
	client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');
	console.log('');
	const playingMsg = `${client.config.defaultSettings.prefix}status`;
	try {
		client.user.setActivity(playingMsg, {
			type: 'LISTENING'
		});
		client.logger.debug(`Set playing message to ${playingMsg}`);
	} catch (e) {
		return client.logger.error(e);
	}
};