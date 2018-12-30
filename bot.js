//Copied from https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
var Discord = require('discord.io');
var logger = require('winston');
// 
if(process.env["env"] == "prod"){
    var token = process.env[token];
}
else{
    var auth = require('./auth.json');
    var token = auth.token;
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: token,
   autorun: true
});

var responseObject = {
  "!sad": "My mind is broken!",
  "!angry": "Stabby times",
  "!scared": "Leaving now",
  "!ping": "pong"
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
/*
	//Did the bot send the message?
	if(message.author == bot.user){
	return
}
       //Look for the bot being tagged
	if(message.content.includes(bot.user.toString())){
		bot.sendMessage({
			to: channelID,
			message: "Heeding the command of "+message.author.toString()
		}); //end of message
	}
*/
        var args = message.substring(0).split(' ');
        
	for(i =0; i < args.length; i++){

		var cmd = args[i];
        	
	
		if(responseObject[cmd]){
			bot.sendMessage({
				to: channelID,
				message: responseObject[cmd]
			});
		}
	}
        switch(cmd) {
            // dump list of commands 
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'The list of commands are:'+JSON.stringify(responseObject)
                });
	       break;
	    case 'debug':
		bot.sendMessage({
		to:channelID,
		message:JSON.stringify(args)
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
