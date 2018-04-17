/* eslint-disable no-undef, no-unused-vars */

module.exports = async (client, msg) => {
	if(msg.author.bot) return;
 
	const settings = msg.settings = await client.getGuildSettings(msg.guild);
    
	const settings = msg.settings = client.getGuildSettings(msg.guild);
    
	if(msg.content.indexOf(settings.prefix) !== 0) return;
    
	const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// Get the user or member's permission level from the elevation
	const level = client.permlevel(msg);

	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if(!cmd) return;

	if(!msg.guild && cmd.conf.guildOnly) {
		return msg.channel.send(':warning: Sorry, but this command can not be via private message. You can only use this in a guild.');
	};

	if (level < client.levelCache[cmd.conf.permLevel]) {
		if (settings.systemNotice === 'true') {
		  	return msg.channel.send(`:warning: You do not have permission to use this command.
	  		Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
	  		This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
		} else {
		  	return;
		}
	}

	msg.flags = []; // ?
	while (args[0] && args[0][0] === '-') { // ?
		msg.flags.push(args.shift().slice(1));
	}
	// If the command exists, **AND** the user has permission, run it.
	await cmd.run(client, msg, args, level);
	client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${msg.author.username} (${msg.author.id}) ran command: ${cmd.help.name}`);
};