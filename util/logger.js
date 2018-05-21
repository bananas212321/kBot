/* eslint-disable no-console */

/* 
 * Logger class for easy and aesthetically pleasing console logging 
 * Credit: https://github.com/AnIdiotsGuide/guidebot/blob/master/util/Logger.js
 */

const chalk = require('chalk');
const moment = require('moment');

exports.log = (content, type = 'log') => {
	const timestamp = `[${moment().format('MM/DD/YYYY HH:mm:ss')}]:`;
	switch (type) {
	case 'log': {
		return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
	}
	case 'notice': {
		return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
	}
	case 'warn': {
		return console.warn(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
	}
	case 'error': {
		return console.error(`${timestamp} ${chalk.white.bgRed(type.toUpperCase())} ${content} `);
	}
	case 'debug': {
		return console.info(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
	}
	case 'cmd': {
		return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content} `);
	}
	case 'ready': {
		return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content} `);
	}
	case 'loaded': {
		return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content} `);
	}
	case 'unloaded': {
		return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content} `);
	}
	case 'reconnecting': {
		return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
	}
	case 'disconnect': {
		return console.log(`${timestamp} ${chalk.black.bgRed(type.toUpperCase())} 
${content}`);
	}
	default: throw new TypeError('Logger type must be either warn, debug, log, ready, cmd, notice, loaded, unloaded, reconnecting, disconnect or error.');
	}
}; 

exports.error = (...args) => this.log(...args, 'error');

exports.warn = (...args) => this.log(...args, 'warn');

exports.debug = (...args) => this.log(...args, 'debug');

exports.cmd = (...args) => this.log(...args, 'cmd');
