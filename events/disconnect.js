module.exports = async (client, eventDetails) => {
	client.logger.log(`
Reason: => ${eventDetails.reason}
Code:   => ${eventDetails.code}
Clean:  => ${eventDetails.wasClean}`, 'disconnect');
	await client.logger.warn('Stopping...');
	return process.exit(1);
};