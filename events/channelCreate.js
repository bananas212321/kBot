/* eslint-disable no-console */
module.exports = async (client, channel) => {
	try {
		await client.user.setActivity(`k!help | ${client.users.size} users in ${client.channels.size} channels for ${client.guilds.size} guilds`, {
			type: 'LISTENING'
		});
	} catch (e) {
		return client.logger.error(e);
	}
};