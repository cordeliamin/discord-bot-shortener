module.exports = {
	name: 'delete',
	description: 'Delete a specified number of messages from this channel.',
	args: true,
	async execute(message, args) {
		const amount = args[0];
        // only I am allowed to delete
        if(message.author.id !== '368851887581298691') {
            message.channel.send("You are not allowed to use that command.");
        }
		else if(isNaN(amount)) {
            message.channel.send("Error: Requires a number as an argument.");
        }
        else if(amount > 100) {
            message.channel.send("You can only delete a maximum of 100 messages at once.");
        }
        else{
            try{ 
                await message.channel.messages.fetch({ limit: amount, before: message.id })
                .then(messages => {
                    message.channel.bulkDelete(messages);
                });
            } 
            catch (error) {
                console.log("An error occured in delete.");
            }
        }
	},
};