module.exports = {
	name: 'bday',
	description: 'Happy birthday to the birthday boi',
	args: false,
	execute(message, args) {
		if(args[0]) {
            const user = message.mentions.users.first();
			message.channel.send(`Happy birthday ${user}!\nhttps://www.youtube.com/watch?v=fTbEpGZyseA`);
		}
		else{
			message.channel.send("Happy birthday to the <@&836827216817553428>!\nhttps://www.youtube.com/watch?v=fTbEpGZyseA");
		}
	},
};