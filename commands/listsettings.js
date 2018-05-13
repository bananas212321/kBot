const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const guild = await client.settings.get(msg.guild.id);
        const embed = new RichEmbed()
            .setAuthor(`${msg.guild.name}'s settings`, msg.guild.iconURL)
            .addField('Prefix', guild.prefix)
            .addField('Administrator Role', guild.adminRole, true).addField('Moderator Role', guild.modRole, true)
            .setTimestamp()
            .setFooter(`${msg.guild.name}'s settings`)
            .setColor(0xffffff);
        return msg.channel.send(embed);
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
        return client.logger.error(e.stack);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['settings'],
    permLevel: 'User'
};

exports.help = {
    name: 'listsettings',
    category: 'Guild',
    description: 'List the settings for this guild.',
    usage: 'listsettings'
};