exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
	try {
		const guild = await client.settings.get(msg.guild.id);
    	console.log(args.join(' '));
		let role = await msg.guild.roles.find('name', args.join(' '));
		if(!role) {
			role = await msg.guild.roles.find('id', args[0]);
			if(!role) return msg.reply(':warning: Unable to find that role!');
		} else {
			try {
				client.settings.set(msg.guild.id, {
					prefix: guild.prefix,
					modlogChannel: guild.modlogChannel,
					modRole: role,
					adminRole: guild.adminRole,
					systemNotice: guild.systemNotice,
					welcomeChannel: guild.welcomeChannel,
					welcomeEnable: guild.welcomeEnable
				});
				client.logger.log(`Changed ${msg.guild.name} (${msg.guild.id})'s moderator role to ${role.name}`, 'loaded');
				return msg.reply(`:white_check_mark: Successfully changed the moderator role to \`${role.name}\`.`);
			} catch (e) {
				await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
				return client.logger.error(e.stack);
			};
		};
	} catch (e) {
		await msg.reply(`:no_entry_sign: An unexpected error occurred!\n**Details:**\n\`\`\`diff\n- ${e.stack}\`\`\``);
		return client.logger.error(e.stack);
	};
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setmod', 'mod', 'moderator'],
    permLevel: 'Administrator'
};

exports.help = {
    name: 'modrole',
    category: 'Guild',
    description: 'Set the moderator role for this guild.',
    usage: 'modrole (name or ID of role)'
};
