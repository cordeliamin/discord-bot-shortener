require("dotenv").config();
const { nanoid } = require('nanoid');
const shortSchema = require("../models/ShortenedURL.js");
const dns = require('dns');

const shorten = async (originalURL) => {
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
		dns.lookup(originalUrl.hostname, (err) => {
			if (err) {
				return console.error("Error: Address not found");
			};
		});
		const shortened = await shorten(originalUrl);
		if(shortened){
			message.reply(path.join("https://discord-shortener.herokuapp.com/", shortened));
		}
		else{
			message.reply("Couldn't shorten");
		}
		console.log(`Shortened ${originalUrl} to ${shortened}`);
		
	}
};