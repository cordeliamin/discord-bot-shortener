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

const PORT = process.env.PORT || 3000;
app.set("port", PORT)
const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
  });

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
mongoose.connect(process.env.DBConnection, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log("connected to database");
});

// function to check if the shortened link is valid
const shortIDExists = (id) => shortSchema.findOne({ shortID: id });

// home route
app.get('/', (_, res) => {
	res.send("Howdy!");
});

// route to handle shortened links
app.get('/:shortID', (req, res) => {
	const shortID = req.params.shortID;

	shortIDExists(shortID)
		.then(doc => {
			// console.log("Trying to redirect " + shortID);
			if (!doc) {
				return res.send('Uh oh. We could not find a link at that URL');
			}
			else{
				// console.log("Redirecting to " + doc.longURL);
				res.redirect(doc.longURL);
			}
		})
		.catch(console.error);
});

// log in to discord
client.login(process.env.TOKEN);

