module.exports = (client, debug) => { /* eslint-disable no-console */
	if(debug.includes(client.config.token)) return;
	if(debug.startsWith('[ws] [connection] Heartbeat acknowledged, ')) {
		client.logger.debug(debug);
		const used = process.memoryUsage();
		for (let key in used) {
			client.logger.debug(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
		}
	} else {
		return client.logger.debug(debug);
	}
};