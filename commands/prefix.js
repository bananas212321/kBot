exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const guild = await client.settings.get(msg.guild.id);
        if(!args[0]) return msg.reply(':warning: Invalid argument!');
        if(args[0] > 3) return msg.reply(':warning: The prefix can not be more than 3 characters long.');
        try {
            await client.settings.set(msg.guild.id, {
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
    aliases: ['setprefix'],
    permLevel: 'Administrator'
};

exports.help = {
    name: 'prefix',
    category: 'Guild',
    description: 'Change the prefix for this guild.',
    usage: 'prefix k$'
};