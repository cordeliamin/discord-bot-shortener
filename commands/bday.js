module.exports = {
	name: 'bday',
	description: 'Happy',
	args: false,
	execute(message, args) {
		if(args[0]) {
            const user = message.mentions.users.first();
			message.channel.send(`${user} https://www.youtube.com/watch?v=fTbEpGZyseA`);
		}
		else{
			message.channel.send("<@&836827216817553428> https://www.youtube.com/watch?v=fTbEpGZyseA");
		}
	},
};