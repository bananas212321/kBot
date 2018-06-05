const { get } = require('snekfetch'),
      { RichEmbed } = require('discord.js');

exports.run = async (client, msg, [format, ...loc], level) => { // eslint-disable-line no-unused-vars
    loc = loc.join(' ');
    if(!format || format !== 'c' || format !== 'f') format = 'c';
    try {
        if(!loc) return msg.reply(`:warning: Invalid command usage!\n**Usage:** k!${exports.help.usage}`);
        let message = await msg.reply(`Grabbing weather for **${loc}**...`);
        get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${loc}%2Ccn%22)%20and%20u%3D%22${format}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`).then(res => {
            const data = res.body.query.results;
            if(!data.channel.location) return msg.reply(':no_entry_sign: The search returned no data, make sure that the location you provided is vaild!');
            let embed = new RichEmbed()
                .setAuthor(`Current weather for ${data.channel.location.city}, ${data.channel.location.country}`, 'https://cdn.discordapp.com/attachments/450941337244794880/450941369104465921/asset.jpg')
                .addField('Overview', `${data.channel.item.forecast[0].text}`).addField('Humidity', `${data.channel.atmosphere.humidity}%`)
                .addField('Temperature', `High of ${data.channel.item.forecast[0].high}°${data.channel.units.temperature}, low of ${data.channel.item.forecast[0].low}°${data.channel.units.temperature}`)
                .setFooter('Weather grabbed from: Yahoo! Weather API', 'https://cdn.discordapp.com/attachments/450941337244794880/450941369104465921/asset.jpg').setURL('https://developer.yahoo.com/weather/').setTimestamp();
            switch (data.channel.item.forecast[0].text) {
                case 'Rain':
                    embed.setColor(0x0f5ddb);
                    break;
                case 'Scattered Showers':
                    embed.setColor(0x6ca1f6);
                    break;
                case 'Showers':
                    embed.setColor(0x6ca1f6);
                    break;
                case 'Thunderstorms':
                    embed.setColor(0xffe100);
                    break;
                case 'Partly Cloudy':
                    embed.setColor(0xc0d5f7);
                    break;
                case 'Mostly Cloudy':
                    embed.setColor(0xffffff);
                    break;
                case 'Cloudy':
                    embed.setColor(0xeae8e8);
                    break;
                case 'Mostly Sunny':
                    embed.setColor(0xffd800);
                    break;
                case 'Breezy':
                    embed.setColor(0xb2b2b2);
                default:
                    embed.setColor(0xffffff);
                    break;
            }
            return message.edit({ embed: embed });
        }).catch('error', (e) => {
            msg.reply(':no_entry_sign: An unexpected error has occured while grabbing the weather data.');
            return client.logger.error(`Error: ${e.message}\nStack:\n${e.stack}`);
        });
    } catch (e) {
        await msg.reply(':no_entry_sign: Oops! Something went wrong and an unexpected error occurred!');
        return client.logger.error(e.stack);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['forecast'],
    permLevel: 'User'
};

exports.help = {
    name: 'weather',
    category: 'Bot',
    description: 'Grab the weather for a specified location.',
    usage: 'weather <C/F> <location>'
};