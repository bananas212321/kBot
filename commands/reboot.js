exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    client.logger.log(`Unloading ${client.commands.array().length} commands...`, 'notice');
    await msg.channel.send(`**Unloading ${client.commands.array().length} commands...**`);
    await client.commands.forEach(async (cmd) => {
        await client.unloadCommand(cmd);
        client.logger.log(cmd.help.name, 'unloaded');
    });
    client.logger.log(`Unloaded ${client.commands.array().length} commands...`, 'unloaded');
    await msg.channel.send(`:white_check_mark: **Unloaded all ${client.commands.array().length} commands.**`);
    await msg.channel.send(':warning: **Shutting down now...**');
    await client.logger.log(`Shutting down...`, 'warn');
    process.exit(1);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'Bot Owner'
};

exports.help = {
    name: 'reboot',
    category: 'Config',
    description: 'Reboot kBot.',
    usage: 'reboot'
};