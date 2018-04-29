/* eslint-disable no-unused-vars */
const responsesArray = ['The coin landed on **heads!**', 'The coin landed on **tails!**', 'And the coin says... **tails!**', 'And the coin says... **heads!**'];

exports.run = (client, msg, args, level) => {
	return msg.reply(responsesArray[Math.floor(Math.random() * responsesArray.length)]);
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