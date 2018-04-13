module.exports = (client, debug) => {
	if(debug.includes(client.config.token)) return;
	client.logger.log(`${debug}`, 'debug');
};