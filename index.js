// dependencies
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
{
  "TOKEN",
  "PREFIX"
} = require(./config.json);

const client = new Discord.Client();

var servers = {};

client.once('ready', () => {
    console.log('Vibe is online!');
});

client.once('reconnecting', () => {
    console.log('Vibe is reconnecting!');
});

client.once('disconnect', () => {
    console.log('Vibe is disconnected');
});

client.on('message', message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'play':

      function play(connection,message){
        var server = servers[message.guild.id]

        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

        server.queue.shift();

        server.dispatcher.on("end", function() {
          if(server.queue[0]) {
            play(connection,message);
          } else {
            connection.disconnect();
          }
        });
      }

      if (!args[1]){
        message.channel.send("provide a link please!");
        return;
      }

      if(!message.member.voice.channel) {
        message.channel.send("You must be in a channel to play a song");
        return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue : []
      }

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection) {
        play(connection,message);
      })
    case "skip":

      break;
  }
})


client.login('TOKEN');
