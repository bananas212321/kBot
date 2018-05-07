const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        /* Check to make sure that there is a user to kick */
        if(!args[0]) return msg.reply(':warning: No user to ban was provided!');
        if(!msg.mentions.users.first()) return msg.reply(':warning: No user to ban was provided!');

        /* Make sure that you can kick the user */
        let user = await msg.guild.member(msg.mentions.users.first());
        if(!user) return msg.reply(':warning: I\'m unable to find that user.');
        if(!user.bannable) return msg.reply(':warning: I\'m unable to ban that user.');
        if(msg.guild.member(msg.author).highestRole.calculatedPosition <= user.highestRole.calculatedPosition) return msg.reply(':no_entry_sign: You\'re unable to kick users with a higher/equal role than you!');
        
        /* Kick the user */
        args.shift();
        try {                    
            let reason = (!args[0]) ? 'No reason provided' : args.join(' ');
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
    usage: 'ban @user#0001 <number of days worth of messages to delete (default is zero)> <reason>'
};
