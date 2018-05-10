const copypastaKeys = ['oceanman', 'navyseal'];
const copypastas = require('../util/copypasta.json');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    const guildConf = client.settings.get(msg.guild.id);
    if(!args[0]) return msg.reply(`:warning: Invalid usage of command.
**Correct Usage:** \`${guildConf.prefix}${exports.help.usage}\``);
    if(!copypastaKeys.includes(args.join(' ').toLowerCase())) return msg.reply(`:warning: Copypasta not found! If you think this should be added, shoot me a DM!
**Copypastas I currently have:** \`${copypastaKeys.join(', ')}\``);
    switch (args.join(' ').toLowerCase()) {
        case 'oceanman':
            await msg.author.send(copypastas.oceanman);
            return msg.reply(':white_check_mark: I\'ve just sent you the copypasta, check your DMs!');
            break;
        case 'navyseal':
            await msg.author.send(copypastas.navyseal);
            return msg.reply(':white_check_mark: I\'ve just sent you the copypasta, check your DMs!');
            break;
        default:
            return msg.reply(':warning: An error occured!');
            break;
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'copypasta',
    category: 'Fun',
    description: 'Want to use a copypasta on the go but too lazy to search for it on the internet? Look no further. This command will do just that.',
    usage: 'copypasta (copypasta name, e.g. oceanman)'
};