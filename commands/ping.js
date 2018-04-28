exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    const message = await msg.channel.send('Pinging...');
    return message.edit(`Pong! Latency is **~${message.createdTimestamp - msg.createdTimestamp}ms**
API Latency is **~${Math.round(client.ping)}ms**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pong'],
    permLevel: 'User'
};

exports.help = {
    name: 'ping',
    category: 'Bot',
    description: 'Get the bot\'s ping! (Not representative of your network connection.)',
    usage: 'ping'
};