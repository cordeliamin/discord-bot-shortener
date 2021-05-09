module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	execute(message, args) {
		if(args[0] == "cutie") {
			message.channel.send("<@&834499107263086684>");
		}
		else{
			message.channel.send("A boogaloo or bungalow is a style of house or cottage that is" +
			"typically either a single story or has a second, half, or partial story," +
			"that is built into a sloped roof. Bungalows are typically small in terms" +
			"of size and square footage and often are distinguished by the presence of dormer windows and verandas.");
		}
	},
};