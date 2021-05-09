const mongoose = require("mongoose");
const ShortURLSchema = mongoose.Schema({
    longURL: {
        type: String,
        required: true
    },
    shortID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ShortenedURL", ShortURLSchema);