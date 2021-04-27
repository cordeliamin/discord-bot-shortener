const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // return early if not a command
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    // remove prefix and split into arguments
    const args = message.content.slice(prefix.length).split(/ +/);
    // pop command name
    const commandName = args.shift().toLowerCase();

    // gets commandName or its alias
    const command = client.commands.get(commandName)
                    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    // if it requires arguments but didn't get any return early
    if (command.args && !args.length) {
            return message.channel.send(`You forgot the arguments, dipshit`);
    }

	try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

client.login(client.login(token));
