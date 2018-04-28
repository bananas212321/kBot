module.exports = (client, e) => {
	return client.logger.warn(e.message);
};