/* eslint-disable no-console */
module.exports = async (client, guild) => {
	try {
		await client.settings.set(guild.id, client.config.defaultSettings);
		return client.logger.log(`Settings for ${guild.name}`, 'loaded');
	} catch (e) {
		return client.logger.error(e.stack);
	};
};