module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	execute(message, args) {
		if(args[0] == "dumbass") {
			message.reply("fuck you too");
		}
		else{
			message.channel.send('fuck off');
		}
	},
};