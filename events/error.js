module.exports = (client, e) => {
	return client.logger.error(e.message);
};