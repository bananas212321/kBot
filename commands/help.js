const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
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
        embed.setTimestamp();
    return message.channel.send(embed);
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
    description: 'Grab a list of kBot\'s commands, all in one tidy Rich Embed.',
    usage: 'help'
};