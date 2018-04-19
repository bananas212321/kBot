/* eslint-disable no-console */
module.exports = async (client, guild) => {
	try {
		await client.settings.set(guild.id, client.config.defaultSettings);
		client.logger.log(`Settings for ${guild.name}`, 'loaded');
	} catch (e) {
		client.logger.error(e);
	}
};