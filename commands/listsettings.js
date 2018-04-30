const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const guild = await client.settings.get(message.guild.id);
        const embed = new RichEmbed()
            .setAuthor(`${message.guild.name}'s settings`, message.guild.iconURL)
            .addField('Prefix', guild.prefix)
            .addField('Administrator Role', guild.adminRole, true).addField('Moderator Role', guild.modRole, true)
            .setTimestamp()
            .setColor(0xffffff);
        return message.channel.send(embed);
    } catch (e) {
        await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
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