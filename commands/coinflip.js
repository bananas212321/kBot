/* eslint-disable no-unused-vars */
const responsesArray = ['The coin landed on **heads!**', 'The coin landed on **tails!**', 'And the coin says... **tails!**', 'And the coin says... **heads!**'];

exports.run = async(client, msg, args, level) => {
	try {
		return msg.reply(responsesArray[Math.floor(Math.random() * responsesArray.length)]);	
	} catch (e) {
		await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
		return client.logger.error(e.stack);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['flip', 'coin'],
	permLevel: 'User'
};

exports.help = {
	name: 'coinflip',
	category: 'Fun',
	description: 'Flip a coin.',
	usage: 'coinflip'
};