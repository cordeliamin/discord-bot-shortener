require("dotenv").config();
const { nanoid } = require('nanoid');
const shortSchema = require("../models/ShortenedURL.js");
const dns = require('dns');

const shorten = async (originalURL) => {
	try {
		const queryResult = await shortSchema.findOneAndUpdate({ longURL: originalURL },
			{
				$setOnInsert: {
					longURL: originalURL,
					shortID: nanoid(7),
				},
			},
			{
				returnOriginal: false,
				upsert: true,
				useFindAndModify: false
			}
		);
		return queryResult.shortID;
	} catch (error) {
		return console.error(error);
	}


};

module.exports = {
	name: 'shorten',
	description: 'Shorten a URL. Does automatically in #videos without needing a prefix',
	args: false,
	async execute(message) {
		// assuming entire message is only a URL
		// checking if the format matches a URL
		let originalUrl;
		try {
			originalUrl = new URL(message.content);
		} catch (err) {
			return console.error(`Error: ${err}`);
		}

		// checking if the URL is valid 
		dns.lookup(originalUrl.hostname, async (err) => {
			if (!err){ 
				const shortened = await shorten(originalUrl);
				if (shortened) {
					//respond with the new link and delete the message containing the old one
					message.reply(`https://discord-shortener.herokuapp.com/${shortened}`);
					message.delete();
				}
				else {
					message.reply("Couldn't shorten");
				}
			}
			else{
				console.error("Error: DNS lookup failed");
			}
		});


	}
};