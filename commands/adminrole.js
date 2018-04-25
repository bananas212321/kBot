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
					modRole: guild.modRole,
					adminRole: role.name,
					systemNotice: guild.systemNotice,
					welcomeChannel: guild.welcomeChannel,
					welcomeEnable: guild.welcomeEnable
				});
				client.logger.log(`Changed ${msg.guild.name} (${msg.guild.id})'s administrator role to ${role.name}`, 'loaded');
				return msg.reply(`:white_check_mark: Successfully changed the administrator role to \`${role.name}\`.`);
			} catch (e) {
				msg.reply(`:no_entry_sign: There was an error when trying to change the settings for this guild.
**Details:** \`${e.stack}\``);
				return client.logger.error(e.stack);
			};
		};
	} catch (e) {
		msg.reply(`:no_entry_sign: There was an error when trying to find the roles to change the settings for this guild.
**Details:** \`${e.stack}\``);
		return client.logger.error(e.stack);
	};
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setadmin', 'admin'],
    permLevel: 'Server Owner'
};

exports.help = {
    name: 'adminrole',
    category: 'Guild',
    description: 'Set the admin role for this guild.',
    usage: 'adminrole (name or ID of role)'
};