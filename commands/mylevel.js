exports.run = async (client, msg, args, level) => {
    try {
        const friendly = await client.config.permLevels.find(l => l.level === level).name;
        return msg.reply(`Your permission level is: ${level} - ${friendly}`);
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
        return client.logger.error(e.stack);
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'mylevel',
    category: 'Bot',
    description: 'Tells you your permission level for the current message location.',
    usage: 'mylevel'
};