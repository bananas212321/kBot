/* Credit https://github.com/AnIdiotsGuide/guidebot/blob/e2e717d2a09db80aa03bc47bf07cd5361f50a622/commands/help.js */

exports.run = async (client, message, args, level) => {
	// If no specific command is called, show all filtered commands.
	if (!args[0]) {
		// Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
		const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
	
		// Here we have to get the command names only, and we use that array to get the longest name.
		// This make the help commands 'aligned' in the output.
		const commandNames = myCommands.keyArray();
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
	
		let currentCategory = '';
		let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;
		const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
		sorted.forEach(c => {
			const cat = c.help.category.toProperCase();
			if (currentCategory !== cat) {
				output += `\u200b\n== ${cat} ==\n`;
				currentCategory = cat;
			}
			output += `${message.settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
		});
		await message.reply(':white_check_mark: I have just messaged you a list of commands, check your DMs!')
		return message.author.send(output, {code: 'asciidoc', split: { char: '\u200b' }});
	} else {
		// Show individual command's help.
		let command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			if (level < client.levelCache[command.conf.permLevel]) return;
			let prefix = 'k!'
			if(message.guild && client.settings.has(message.guild.id)) prefix = message.settings.prefix; 
			message.channel.send(`= ${command.help.name.toProperCase()} = \nDescription :: ${command.help.description}\nUsage :: ${prefix}${command.help.usage}\nAliases :: ${command.conf.aliases.join(', ')}`, { code: 'asciidoc'} );
		}
	}
};
  
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['cmds', 'commands'],
	permLevel: 'User'
};
  
exports.help = {
	name: 'help',
	category: 'Bot',
	description: 'Displays all the available commands for your permission level.',
	usage: 'help [command]'
};