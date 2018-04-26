exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send('Pinging...');
    msg.edit(`Pong! Latency is **~${msg.createdTimestamp - message.createdTimestamp}ms**
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