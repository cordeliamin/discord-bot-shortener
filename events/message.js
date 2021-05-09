const { prefix, ShortenChannel } = require("../config.json");
// requrire the shorten command
const shorten = require("../commands/shorten.js");

module.exports = {
    name: 'message',
    execute(message, client) {
        // doesn't need the prefix if it's in the shortener channel. Call shorten()
        // unless the message is from the bot
        if(message.channel == ShortenChannel && !message.content.startsWith(prefix) 
            && message.author.id != "694364269608960111"){
            shorten.execute(message);
            return;
        }

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

        // if the user doesn't have permission
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.channel.send("You are not allowed to use that command.");
            }
        }

        // if it requires arguments but didn't get any, return early
        if (command.args && !args.length) {
            return message.channel.send(`You forgot the argument(s)`);
        }

        try {
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    },
};