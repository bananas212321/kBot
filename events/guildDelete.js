/* eslint-disable no-console */
module.exports = async (client, guild) => {
	try {
		await client.settings.delete(guild.id);
		return client.logger.log(`Settings for ${guild.name}`, 'unloaded');
	} catch (e) {
		return client.logger.error(e.stack);
	};
};