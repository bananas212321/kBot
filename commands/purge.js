/* eslint-disable no-console */
const { RichEmbed } = require('discord.js'); // Define RichEmbed so we can use it later

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	let val = parseInt(args[0]); // Make sure to convert the string to an integer so we can actually use it properly
	try {
		if(!isNaN(val)) { // Make sure the arg is a valid number
			if(val == 0) return message.reply(':warning: You must delete at least 1 message!'); // Make sure the user isn't trying to clear nothing
			if(val > 100) return message.reply(':warning: You can not delete more than 100 messages!'); // Make sure the user ins't trying to clear more than we can
			await message.delete();
			message.channel.bulkDelete(val).then(msgs => { // Bulk delete the messages
				const embed = new RichEmbed()
					.setAuthor(`Purged ${msgs.size} message(s) from ${msgs.channel.name}`, client.user.avatarURL)
					.setTimestamp() // Add a timestamp to the bottom of the embed
					.setColor(0xffffff) // Set the embed's colour to white
				return message.channel.send(embed); // Then output an embed
			}).catch(e => client.logger.error(e));
		} else {
			message.reply(':warning: Please specify an amount of messages to delete. (Between 1 and 100)');
		};
	} catch (e) {
		client.logger.error(e);
	};
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['prune'],
    permLevel: 'Moderator'
};

exports.help = {
    name: 'purge',
    category: 'Moderation Tools',
    description: 'Delete messages from a channel in bulk.',
    usage: 'purge'
};
