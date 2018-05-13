const Client = require('uptime-robot');
const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    try {
        await msg.channel.send(':information_source: **Grabbing status...**');
        const cl = new Client(client.config.apiKey);
        cl.getMonitors({customUptimeRatio: [1, 7, 30]}, (e, res) => {
            if (e) return client.logger.log(e, 'error');
            switch(res[0].status) {
                case '0': { // Paused
                    let embed = new RichEmbed()
                        .setAuthor('kBot Status', client.user.avatarURL)
                        .setDescription('The status monitoring is currently **paused** and should be back up soon.')
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                }
                case '1': { // Unchecked
                    let embed = new RichEmbed()
                        .setAuthor('kBot Status', client.user.avatarURL)
                        .setDescription('The status monitoring has not yet been checked, this is most likely because it has just been started.')
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                }
                case '2' : { // Up
                    let embed = new RichEmbed()
                        .setAuthor('kBot Status', client.user.avatarURL)
                        .addField('Status:', ':white_check_mark: Online')
                        .addField('Uptime (24 Hours):', `${res[0].customuptimeratio[0]}%`, true).addField('Uptime (7 Days):', `${res[0].customuptimeratio[1]}%`, true).addField('Uptime (30 Days):', `${res[0].customuptimeratio[2]}%`, true)
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                }
                case '8' : { // Seems down
                    let embed = new RichEmbed()
                        .setAuthor('kBot Status', client.user.avatarURL)
                        .addField('Status:', ':warning: Connection may be unstable and the bot could crash soon.')
                        .addField('Uptime (24 Hours):', `${res[0].customuptimeratio[0]}%`, true).addField('Uptime (7 Days):', `${res[0].customuptimeratio[1]}%`, true).addField('Uptime (30 Days):', `${res[0].customuptimeratio[2]}%`, true)
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                }
                case '9' : { // Down
                    let embed = new RichEmbed()
                        .setAuthor('kBot Status', client.user.avatarURL)
                        .addField('Status:', `The bot is supposed to be down, either UptimeRobot is fucking up or something else went wrong. :thinking:`)
                        .addField('Uptime (24 Hours):', `${res[0].customuptimeratio[0]}%`, true).addField('Uptime (7 Days):', `${res[0].customuptimeratio[1]}%`, true).addField('Uptime (30 Days):', `${res[0].customuptimeratio[2]}%`, true)
                        .setColor(0xffffff);
                    return msg.channel.send(embed);
                }
                default: {
                    await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
                    return client.logger.error(e.stack);
                }
            }
        });
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
		return client.logger.error(e.stack);
    }
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'status',
    category: 'Bot',
    description: 'Get the status for kBot.',
    usage: 'status'
};