const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');    // command prefix
const mongoose = require("mongoose");
const shortSchema = require("./models/ShortenedURL.js");
const express = require('express');
require("dotenv").config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const app = express();

// getting command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// getting event files
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

// connect to database
mongoose.connect(process.env.DBConnection, { useNewUrlParser: true }, () => {
	console.log("connected to database");
});

// function to check if the shortened link is valid
const shortIDExists = (id) => shortSchema.findOne({ short_id: id });

// route to handle shortened links
app.get('/:shortID', (req, res) => {
	const shortID = req.params.shortID;
	shortIDExists(shortID)
		.then(doc => {
			if (!doc) {
				return res.send('Uh oh. We could not find a link at that URL');
			}
			res.redirect(doc.original_url)
		})
		.catch(console.error);
});

// log in to discord
client.login(process.env.TOKEN);

