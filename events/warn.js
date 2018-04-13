module.exports = (client, e) => {
	client.logger.log(`${e.message}`, 'warn');
};