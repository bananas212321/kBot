module.exports = async (client, eventDetails) => {
	client.logger.log(`
Reason: => ${eventDetails.reason}
Code:   => ${eventDetails.code}
Clean:  => ${eventDetails.wasClean}`, 'disconnect');
	
	await client.logger.log('Stopping...', 'warn');
	return process.exit(1);
};