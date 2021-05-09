module.exports = {
	name: 'help',
	description: 'Send help',
	args: false,
	execute(message) {
		message.channel.send("Help yourself, loser");
	},
};