const urban = require('urban');
const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
	try {
		if(!args.join(' ')) return msg.reply(':warning: You can\'t search for nothing!');
		urban(args.join(' ')).first((json) => {
			if(!json) return msg.reply(`:warning: Nothing was found for **${args.join(' ')}**.`);
			let embed = new RichEmbed()
				.setAuthor(`Urban Dictionary results for: ${args.join(' ')}`, 'https://vignette.wikia.nocookie.net/logopedia/images/a/a7/UDAppIcon.jpg/revision/latest?cb=20170422211150')
				.addField('Definition', json.definition.length <= 1024 ? json.definition : `Truncated due to exceeding maximum length\n${json.definition.slice(0, 970)}`)
				.addField('Example', json.example.length <= 1024 ? json.example : `Truncated due to exceeding maximum length\n${json.example.slice(0, 970)}`)
				.setFooter(`Permalink: ${json.permalink}`)
				.setColor(0xffffff);
			return msg.channel.send(embed);
		});	
	} catch (e) {
		await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
		return client.logger.error(e.stack);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ud', 'urbandict'],
	permLevel: 'User'
};

exports.help = {
	name: 'urban',
	category: 'Bot',
	description: 'Grab the definition of anyword from the Urban Dictionary.',
	usage: 'urban term'
};