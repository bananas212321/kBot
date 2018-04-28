const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args, level) => { // eslint-disable-line no-unused-vars
	let embed = new RichEmbed()
		.setAuthor('Stats for kBot', client.user.avatarURL)
		.addField('Users', client.users.size, true).addField('Guilds', client.guilds.size, true).addField('Channels', client.channels.size, true)
		.addField('Ping to WebSocket', `${client.ping}ms`)
		.addField('Last time logged in', client.readyAt)
		.setTimestamp()
		.setColor(0xffffff);
	return msg.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['botstats'],
	permLevel: 'User'
};

exports.help = {
	name: 'stats',
	category: 'Bot',
	description: 'Get all the statistics of kBot (e.g. guilds, users, channels).',
	usage: 'stats'
};