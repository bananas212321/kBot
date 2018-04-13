const Discord = require('discord.js');

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

const client = new Discord.Client();

client.config = require('./config.js');
client.logger = require('./util/logger.js');

client.commands = new Enmap(); // Save the commands to an Enmap
client.aliases = new Enmap(); // Save the aliases of the commands to an Enmap

client.settings = new Enmap({
    provider: new EnmapLevel({
        name: 'settings'
    })
});

require('./modules/functions.js')(client);

const init = async () => {
    // Here we load **commands** into memory, as a collection, so they're accessible
    // here and everywhere else.
    const cmdFiles = await readdir('./commands/');
    client.logger.log(`Loading ${cmdFiles.length} commands.`, 'notice');
    await cmdFiles.forEach(async (f) => {
        if (!f.endsWith('.js')) return;
        const start = new Date().getTime();
        const response = await client.loadCommand(f);
        const end = new Date().getTime();
        const time = end - start;
        client.logger.log(`${f} (Time taken: ~${time}ms)`, 'loaded');
        /// if (response) console.log(response);
    });
    console.log('\n');
    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir('./events/');
    client.logger.log(`Loading ${evtFiles.length} events.`, 'notice');

    await evtFiles.forEach(async (f) => {
        const eventName = f.split('.')[0];
        const start = new Date().getTime();
        const event = await require(`./events/${f}`);
        const end = new Date().getTime();
        const time = end - start;
        client.logger.log(`${f} (Time taken: ~${time}ms)`, 'loaded');
        // This line is awesome by the way. Just sayin'.
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${f}`)];
    });
    console.log('\n');
    
    // Generate a cache of client permissions for pretty perms
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }
  
    // Here we login the client.
    client.login(client.config.token);
  
  // End top-level async/await function.
};

try {
    init();
} catch (e) {
    client.logger.error(e.stack);
    return process.exit(1);
}