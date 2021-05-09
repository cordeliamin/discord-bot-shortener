module.exports = {
	name: 'bayesian',
	description: 'What is bayesian statistics really?',
	args: false,
	execute(message) {
		message.channel.send("Bayesian statistics is a theory in the field " +
        "of statistics based on the Bayesian interpretation of probability " +
        "where probability expresses a degree of belief in an event. The " +
        "degree of belief may be based on prior knowledge about the event, " +
        "such as the results of previous experiments, or on personal beliefs " +
        "about the event. This differs from a number of other interpretations " +
        "of probability, such as the frequentist interpretation that views " +
        "probability as the limit of the relative frequency of an event after many trials.");
	},
};