/** TODO: 
 * Check out: https://www.npmjs.com/package/trivia-api
 */
/* eslint-disable no-console, no-undef */
const Discord = require('discord.js');

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

const client = new Discord.Client();

client.config = require('./config.js');
client.logger = require('./util/logger.js');

const loadEnmaps = async () => {
    client.commands = await new Enmap(); // Save the commands to an Enmap
    client.logger.log('Commands Enmap!', 'loaded');

    client.aliases = await new Enmap(); // Save the aliases of the commands to an Enmap
    client.logger.log('Aliases Enmap!', 'loaded');

    client.settings = new Enmap({
        provider: new EnmapLevel({
            name: 'Guild Settings',
            dataDir: './data'
        }) 
    });

    client.logger.log('Settings persistent Enmap!', 'loaded');
    console.log('\u200b');
};

try {
    loadEnmaps();
} catch (e) {
    client.logger.error(`While trying to load Enmap(s) ${e.stack}`);
    client.logger.error('Shutting down...');
    process.exit(1);
}

require('./modules/functions.js')(client);

const init = async () => {
    // Here we load **commands** into memory, as a collection, so they're accessible
    // here and everywhere else.
    const cmdFiles = await readdir('./commands/');
    client.logger.log(`Loading ${cmdFiles.length} commands...`, 'notice');
    await cmdFiles.forEach(async (f) => {
        if (!f.endsWith('.js')) return;
        const start = new Date().getTime();
        const response = await client.loadCommand(f);
        const end = new Date().getTime();
        const time = end - start;
        client.logger.log(`${f} (Time taken: ~${time}ms)`, 'loaded');
    });
    console.log('\u200b');
    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir('./events/');
    client.logger.log(`Loading ${evtFiles.length} events...`, 'notice');

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
    console.log('\u200b');
    
    // Generate a cache of client permissions for pretty perms
    client.levelCache = {};

    client.config.permLevels.forEach(thisLevel => {
        client.levelCache[thisLevel.name] = thisLevel.level;
    }); 
  
    // Here we login the client.
    client.login(client.config.token);
  // End top-level async/await function.
};

try {
    init();
} catch (e) {
    client.logger.error(e.stack);
    client.logger.error('Shutting down...');
    process.exit(1);
}

try {
    const http = require('http');
    const express = require('express');
    const app = express();

    app.get('/', (request, response) => {
        client.logger.debug('PING');
        response.sendStatus(200);
    });

    app.listen(process.env.PORT);

    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
} catch (e) {
    client.logger.error(e.stack);
    client.logger.error('Shutting down...');
    process.exit(1);
}