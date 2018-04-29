/* eslint-disable */
const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args, level) => { 
	let sides = (!args[0] || args[0] <= 0) ? 6 : parseInt(args[0]);
	let rolls = (!args[1] || args[1] > 15) ? 1 : parseInt(args[1]);
	if(rolls == 1) {
		return msg.reply(`You rolled a **${Math.floor(Math.random() * sides)}** :game_die:`);
	} else {
		let values = [];
		for (let i = 0;; i++) {
			if (i == rolls) break;
			values.push(Math.floor(Math.random() * sides));
		};
		let embed = new RichEmbed()
			.setAuthor('Dice Rolls', client.user.avatarURL)
		values.forEach((val, i, arr) => {
			embed.addField(`Dice roll #${i + 1}`, `${val}`, true);
		});
		let avg = values.reduce((total, val) => total + val) / values.length; /* Get array average */
		embed.addField('Average', avg).setColor(0xffffff);
		return msg.channel.send(embed);
	};
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['diceroll'],
	permLevel: 'User'
};

exports.help = {
	name: 'dice',
	category: 'Fun',
	description: 'Roll a dice.',
	usage: 'dice <sides> <number of values (max: 15, def: 1)>'
};