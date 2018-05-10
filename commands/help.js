const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        let embed = new RichEmbed()
            .setAuthor('kBot Commands List', client.user.avatarURL).setColor(0xffffff);
            embed.addField('Category: Guild Settings', '-');
            await client.commands.array().forEach(cmd => {
                if(cmd.help.category == 'Guild') {
                    embed.addField(`${cmd.help.name.charAt(0).toUpperCase()}${cmd.help.name.substring(1)} (Guild only: ${cmd.conf.guildOnly})`, cmd.help.description);
                };
            });
            embed.addBlankField().addField('Category: Moderation', '-');
            await client.commands.array().forEach(cmd => {
                if(cmd.help.category == 'Moderation') {
                    embed.addField(`${cmd.help.name.charAt(0).toUpperCase()}${cmd.help.name.substring(1)} (Guild only: ${cmd.conf.guildOnly})`, cmd.help.description);
                };
            });
            embed.addBlankField().addField('Category: Bot', '-');
            await client.commands.array().forEach(cmd => {
                if(cmd.help.category == 'Bot') {
                    embed.addField(`${cmd.help.name.charAt(0).toUpperCase()}${cmd.help.name.substring(1)} (Guild only: ${cmd.conf.guildOnly})`, cmd.help.description);
                };
            });
            embed.addBlankField().addField('Category: Fun', '-');
            await client.commands.array().forEach(cmd => {
                if(cmd.help.category == 'Fun') {
                    embed.addField(`${cmd.help.name.charAt(0).toUpperCase()}${cmd.help.name.substring(1)} (Guild only: ${cmd.conf.guildOnly})`, cmd.help.description);
                };
            });
            embed.setTimestamp();
        await msg.author.send(embed);
        return msg.reply(':white_check_mark: I have just messaged you a list of commands, check your DMs!');
    } catch (e) {
        await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
		return client.logger.error(e.stack);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['cmds', 'commands'],
    permLevel: 'User'
};

exports.help = {
    name: 'help',
    category: 'Bot',
    description: 'Grab a list of kBot\'s commands, all in one tidy RichEmbed.',
    usage: 'help'
};