module.exports = (client, debug) => { /* eslint-disable no-console */
	if(debug.includes(client.config.token)) return;
	if(debug.startsWith('[ws] [connection] Heartbeat acknowledged, ')) {
		client.logger.debug(debug);
		const used = process.memoryUsage();
		for (let key in used) {
			client.logger.debug(`- ${key.toUpperCase()}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
		}
		let uptimeSec = Math.floor(process.uptime());
		let uptimeMin = Math.floor(process.uptime() / 60);
		let uptimeHour = Math.floor(uptimeMin / 60);
		client.logger.debug(`Uptime: ${uptimeHour}:${uptimeMin}:${uptimeSec}`);
		return console.log('');
	} else {
		client.logger.debug(debug);
	}
};