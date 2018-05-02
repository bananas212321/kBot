const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args, level) => { // eslint-disable-line no-unused-vars
	let embed = new RichEmbed()
		.setAuthor(`Showing properties for ${msg.guild.name}`, msg.guild.iconURL)
		.addField('Owner', msg.guild.owner.user.tag, true)
		.addField('Name', msg.guild.name, true)
		.addField('ID', msg.guild.id, true)
		.addField('Number of channels', msg.guild.channels.size, true)
		.addField('Number of members', msg.guild.memberCount, true)
		.addField('Number of roles', msg.guild.roles.size, true)
		.addField('Region', `${msg.guild.region.charAt(0).toUpperCase()}${msg.guild.region.substr(1).toLowerCase()}`)
		.addField('Date created', msg.guild.createdAt)
		.setImage(msg.guild.iconURL)
		.setColor(0xffffff);
	return msg.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['guildsettings'],
	permLevel: 'User'
};

exports.help = {
	name: 'guild',
	category: 'Bot',
	description: 'Get all the statistics of the guild (e.g. users, roles, channels).',
	usage: 'guild'
};
