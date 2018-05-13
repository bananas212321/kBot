/* eslint-disable no-console */
module.exports = async (client, guild) => {
	try {
		await client.user.setActivity(`k!help | ${client.users.size} users in ${client.channels.size} channels for ${client.guilds.size} guilds`, {
			type: 'LISTENING'
		});
		await client.settings.delete(guild.id);
		return client.logger.log(`Settings for ${guild.name}`, 'unloaded');
	} catch (e) {
		return client.logger.error(e.stack);
	};
};