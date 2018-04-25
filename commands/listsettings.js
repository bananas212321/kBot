const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const guild = await client.settings.get(message.guild.id);
        const embed = new RichEmbed()
            .setAuthor(`${message.guild.name}'s settings`, message.guild.avatarURL)
            .addField('Prefix', guild.prefix)
            .addField('Administrator Role', guild.adminRole, true).addField('Moderator Role', guild.modRole, true)
            .setTimestamp()
            .setColor(0xffffff);
        message.channel.send(embed);
    } catch (e) {
        message.reply(`:no_entry_sign: There was an error when trying to find the roles to change the settings for this guild.
**Details: (26)** \`${e.stack}\``);
        console.log(e.stack)
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
    description: 'null',
    usage: 'listsettings'
};