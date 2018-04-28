exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    const invite = await client.generateInvite(['ADMINISTRATOR']);
    return msg.author.send(`**Here is your invite:** ${invite}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['getinvite'],
    permLevel: 'User'
};

exports.help = {
    name: 'invite',
    category: 'Bot',
    description: 'Want to invite kBot to your guild? Just use this command to get an invite!',
    usage: 'invite'
};