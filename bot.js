var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var number;
var imageNumber;
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
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}
function getRandomFloor(min, max){
	return Math.random() * (max - min) + min;
}
function getCoin() {
  result = getRandomFloor(0, 1);
  message = "";
  if(result <= 0.4){
	  message = "E' uscito testa!";
  }else if(result <= 0.8){
	  message = "E' uscito croce!";
  }else if (result > 0.99){
	  message = "Cavoloni! La moneta è caduta perfettamente a metà!" ;
  }
  return message;
}
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
		var number = new Array('https://i.pinimg.com/originals/c4/99/c8/c499c895d4a2622f9f7ffd9d5e624477.png', 
		'https://fireemblem.gamepress.gg/sites/fireemblem/files/2019-02/15%20-%205T91SY5.png',
		'https://data.whicdn.com/images/300073239/large.jpg'
		);
		
		maxNumber = 3;
		
		var imageNumber = Math.floor(Math.random() * number.lenght);
        switch(cmd) {
            // !ping
			case 'moneta':
				bot.sendMessage({
					
					to: channelID,
					message: getCoin()
				});
			break;
			
			case 's':
				bot.sendMessage({
					
					to: channelID,
					message: number[getRandomArbitrary(0, maxNumber)]
				});
			break;
            // Just add any case commands if you want to..
         }
     }
});
