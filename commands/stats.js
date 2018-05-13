const { RichEmbed } = require('discord.js');
const moment = require('moment');
const prettyMs = require('pretty-ms');

exports.run = (client, msg, args, level) => { // eslint-disable-line no-unused-vars
	const memUsage = process.memoryUsage();
	const uptime = prettyMs(client.uptime);

	let embed = new RichEmbed()
		.setAuthor('Stats for kBot', client.user.avatarURL)
		.addField('Users', client.users.size, true).addField('Guilds', client.guilds.size, true).addField('Channels', client.channels.size, true)
		.addField('Ping to WebSocket', `${Math.floor(client.ping)}ms`, true)
		.addField('Uptime', uptime, true)
		.addField('Last time logged in', moment(client.readyAt).format('ddd Do MMM HH:MM:SS A'), true)
		.addField('Memory Usage', `RSS: ${Math.round(memUsage.rss / 1024 / 1024 * 100) / 100}MB | Heap: ${Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100}MB`)
		.setFooter('All data is correct to some degree but not 100% accurate.', client.user.avatarURL)
		.setTimestamp()
		.setColor(0xffffff);
	return msg.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['bot', 'botstats', 'uptime'],
	permLevel: 'User'
};

exports.help = {
	name: 'stats',
	category: 'Bot',
	description: 'Get all the statistics of kBot (e.g. guilds, users, channels).',
	usage: 'stats'
};
