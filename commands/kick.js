const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        /* Check to make sure that there is a user to kick */
        if(!args[0]) return msg.reply(':warning: No user to kick was provided!');
        if(!msg.mentions.users.first()) return msg.reply(':warning: No user to kick was provided!');

        /* Make sure that you can kick the user */
        let user = await msg.guild.member(msg.mentions.users.first());
        if(!user) return msg.reply(':warning: I\'m unable to find that user.');
        if(!user.kickable) return msg.reply(':warning: I\'m unable to kick that user.');
        if(msg.guild.member(msg.author).highestRole.calculatedPosition <= user.highestRole.calculatedPosition) return msg.reply(':no_entry_sign: You\'re unable to kick users with a higher/equal role than you!');

        /* Kick the user */
        try {
            let reason = (!args[1]) ? 'No reason provided' : args.join(' ');
            await user.kick(reason);
            let embed = new RichEmbed()
                .setAuthor(`Kicked ${user.user.tag}`, user.user.avatarURL)
                .addField('Reason', reason)
                .setTimestamp()
                .setColor(0xffffff);
            return msg.channel.send(embed);
        } catch (e) {
            await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
            return client.logger.error(e.stack);
        };
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
		return client.logger.error(e.stack);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Moderator'
};

exports.help = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kick a user from the guild.',
    usage: 'kick <@user> <reason>'
};