const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let embed = new RichEmbed()
        .setAuthor('kBot Commands List', client.user.avatarURL)
        .setColor(0xffffff);
    client.commands.array().forEach(cmd => {
        embed.addField(`${cmd.help.name.charAt(0).toUpperCase()}${cmd.help.name.substring(1)}`, cmd.help.description)
    });
    message.channel.send(embed);
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
    description: 'Help, I\'ve fallen and I can\'t get up!',
    usage: 'help'
};