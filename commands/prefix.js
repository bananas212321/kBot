exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const guild = await client.settings.get(msg.guild.id);
        if(!args[0]) return msg.reply(':warning: Invalid argument!');
        if(args[0] > 2) return msg.reply(':warning: Invalid argument!');
        try {
            client.settings.set(msg.guild.id, {
                prefix: args[0],
                modlogChannel: guild.modlogChannel,
                modRole: guild.modRole,
                adminRole: guild.adminRole,
                systemNotice: guild.systemNotice,
                welcomeChannel: guild.welcomeChannel,
                welcomeEnable: guild.welcomeEnable
            });   
            client.logger.log(`Changed ${msg.guild.name} (${msg.guild.id})'s prefix from ${guild.prefix} to ${args[0]}`, 'loaded');
            return msg.reply(`:white_check_mark: Successfully changed the prefix from \`${guild.prefix}\` to \`${args[0]}\`.`);
        } catch (e) {
            msg.reply(`:no_entry_sign: There was an error when trying to change the settings for this guild.
**Details:** \`${e}\``);
            return client.logger.error(e);
        };
    } catch (e) {
        msg.reply(`:no_entry_sign: There was an error when trying to change the settings for this guild.
**Details:** \`${e}\``);
		return client.logger.error(e);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setprefix'],
    permLevel: 'Administrator'
};

exports.help = {
    name: 'prefix',
    category: 'Guild',
    description: 'Change the prefix for this guild.',
    usage: 'prefix k$'
};