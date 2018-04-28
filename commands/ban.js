const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        /* Check to make sure that there is a user to kick */
        if(!args[0]) return msg.reply(':warning: No user to kick was provided!');
        if(!msg.mentions.users.first()) return msg.reply(':warning: No user to kick was provided!');

        /* Make sure that you can kick the user */
        let user = await msg.guild.member(msg.mentions.users.first() || args[0]);
        if(!user) msg.reply(':warning: I\'m unable to find that user.');
        if(!user.kickable) msg.reply(':warning: I\'m unable to kick that user.');

        let days = parseInt(args[2]);
        if(!days <= 14 || !days < 0) return msg.reply(':warning: You can not delete more than 14 days worth of messages.');

        /* Kick the user */
        if(!days) {
            if(!args[1]) {
                try {
                    let reason = 'No reason given.';
                    await msg.guild.ban(user, { reason: reason });
                    let embed = new RichEmbed()
                        .setAuthor(`Banned ${user.user.tag}`, user.avatarURL)
                        .addField('Reason', reason)
                        .setTimestamp()
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                } catch (e) {
                    await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
                    return client.logger.error(e.stack);
                };
            } else {
                try {
                    args.shift();
                    let reason = args.join(' ');
                    await msg.guild.ban(user, { reason: reason });
                    let embed = new RichEmbed()
                        .setAuthor(`Banned ${user.user.tag}`, user.user.avatarURL)
                        .addField('Reason', reason)
                        .setTimestamp()
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                } catch (e) {
                    await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
                    return client.logger.error(e.stack);
                };
            };
        } else {
            if(!args[1]) {
                try {
                    let reason = 'No reason given.';
                    await msg.guild.ban(user, { reason: reason, days: days });
                    let embed = new RichEmbed()
                        .setAuthor(`Banned ${user.user.tag}`, user.avatarURL)
                        .addField('Reason', reason)
                        .setTimestamp()
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                } catch (e) {
                    await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
                    return client.logger.error(e.stack);
                };
            } else {
                try {
                    args.shift();
                    let reason = args.join(' ');
                    await msg.guild.ban(user, { reason: reason, days: days });
                    let embed = new RichEmbed()
                        .setAuthor(`Banned ${user.user.tag}`, user.user.avatarURL)
                        .addField('Reason', reason)
                        .setTimestamp()
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                } catch (e) {
                    await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
                    return client.logger.error(e.stack);
                };
            };
        };
    } catch (e) {
        await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
		return client.logger.error(e.stack);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Administrator'
};

exports.help = {
    name: 'ban',
    category: 'Moderation',
    description: 'Ban a user from the guild.',
    usage: 'ban @user#0001 <reason> <number of days worth of messages to delete (default is zero)>'
};