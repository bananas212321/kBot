/* eslint-disable no-console */
module.exports = async (client, guild) => {
	try {
		await client.settings.delete(guild.id);
		client.logger.log(`Settings for ${guild.name}`, 'unloaded');
	} catch (e) {
		client.logger.error(e);
	}
};