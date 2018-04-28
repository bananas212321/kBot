module.exports = (client) => {
	return client.logger.log('Attemping to recconect to the WebSocket', 'reconnecting');
};