exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        const invite = await client.generateInvite(['ADMINISTRATOR']);
        return msg.author.send(`**Here is your invite:** ${invite}`);
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
		return client.logger.error(e.stack);
    }

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