//Copied from https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var responseObject = {
  "sad": "My mind is broken!",
  "angry": "Stabby times",
  "scared": "Leaving now",
  "ping": "pong"
};

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

	if(responseObject[cmd]){
		bot.sendMessage({
			to: channelID,
			message: responseObject[cmd]
		});
	}

        switch(cmd) {
            // !ping
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'The list of commands are:'+responseObject
                });
            break;
            // Just add any case commands if you want to..
		//adress for new embed/play command: https://youtu.be/dQw4w9WgXcQ
         }
     }
});
// Trying different listener here
/*
bot.on("message", (message) => {
  if(responseObject[cmd]) {
    message.channel.send(responseObject[cmd]);
  }
});*/
