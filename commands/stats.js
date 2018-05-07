const { RichEmbed } = require('discord.js');
const moment = require('moment');

exports.run = (client, msg, args, level) => { // eslint-disable-line no-unused-vars
	const used = process.memoryUsage();
	const uptimeMin = Math.floor(process.uptime() / 60);
	const uptimeHour = Math.floor(uptimeMin / 60);
  
	let embed = new RichEmbed()
		.setAuthor('Stats for kBot', client.user.avatarURL)
		.addField('Users', client.users.size, true).addField('Guilds', client.guilds.size, true).addField('Channels', client.channels.size, true)
		.addField('Ping to WebSocket', `${Math.floor(client.ping)}ms`, true)
		.addField('Uptime', `Hours: ${Math.floor(uptimeHour)}`, true)
		.addField('Memory Usage', `RSS: ${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB | Heap: ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB` , true)
		.addField('Last time logged in', moment(client.readyAt).format('ddd Do MMM HH:MM:SS A'))
		.setFooter('All data is correct to some degree but not 100% accurate.', client.user.avatarURL)
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
