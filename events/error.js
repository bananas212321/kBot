module.exports = (client, e) => {
	client.logger.log(`${e.message}`, 'error');
};