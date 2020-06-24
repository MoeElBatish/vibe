const Discord = require('discord.js');

const client = new Discord.Client();

const ytdl = require("ytdl-core");

var servers = {};

client.once('ready', () => {
    console.log('Vibe is online!');
});

client.on('message', message => {
  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'play':

      function play(connection,message){
        var server = servers[message.guild.id]

        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

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

      if(!message.member.voiceChannel) {
        message.channel.send("You must be in a channel to play a song");
        return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue : []
      }

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection,message);
      })
  }
})


client.login('722699368917893141');
