# Discord Bot Link Shortener!
A discord bot that shortens links and responds to other basic commands.

Monitors a specific text channel for links and shortens them if they're valid. Responds with a link which redirects to the original URL.
Stores shortened IDs with original URLs using MongoDB Atlas. Deployed on Heroku.

Also bulk deletes messages (constrained to the limits of the Discord API) and responds to a handful of commands with prewritten messages.
