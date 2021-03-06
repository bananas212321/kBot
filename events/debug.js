const prettyMs = require('pretty-ms');

module.exports = async (client, debug) => { /* eslint-disable no-console */
	if(debug.includes(client.config.token)) return;
	if(debug.startsWith('[ws] [connection] Heartbeat acknowledged, ')) {
		client.logger.debug(debug);
		const used = process.memoryUsage();
		for (let key in used) {
			client.logger.debug(`- ${key.toUpperCase()}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
		}
		await client.logger.debug(`Uptime: ${prettyMs(client.uptime)}`);
		return console.log('\u200b');
	} else {
		return client.logger.debug(debug);
	}
};