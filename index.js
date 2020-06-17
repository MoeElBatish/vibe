const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Welcome to Vibe!');
});


client.login('bot_id');