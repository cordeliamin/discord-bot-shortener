module.exports = {
	name: 'delete',
	description: 'Delete a specified number of messages from this channel.',
	args: true,
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
		const amount = args[0];
		if(isNaN(amount)) {
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