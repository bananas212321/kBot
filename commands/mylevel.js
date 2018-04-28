exports.run = async (client, msg, args, level) => {
    const friendly = await client.config.permLevels.find(l => l.level === level).name;
    return msg.reply(`Your permission level is: ${level} - ${friendly}`);
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