module.exports = (client, debug) => { /* eslint-disable no-console */
	if(debug.includes(client.config.token)) return;
	client.logger.log(`${debug}`, 'debug');
};