exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        client.logger.log(`Unloading ${client.commands.array().length} commands...`, 'notice');
        await msg.channel.send(`**Unloading ${client.commands.array().length} commands...**`);
        await client.commands.forEach(async (cmd) => {
            await client.unloadCommand(cmd);
            client.logger.log(cmd.help.name, 'unloaded');
        });
        client.logger.log(`Unloaded ${client.commands.array().length} commands...`, 'unloaded');
        await msg.channel.send(`:white_check_mark: **Unloaded all ${client.commands.array().length} commands.**`);
        await msg.channel.send(':warning: **Shutting down now...**');
        await client.logger.warn('Shutting down...');
        return process.exit(0);
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
        return client.logger.error(e.stack);
    }
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['restart'],
    permLevel: 'Bot Admin'
};

exports.help = {
    name: 'reboot',
    category: 'Config',
    description: 'Reboot kBot. (Locked to the Bot Admins.)',
    usage: 'reboot'
};