const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    reply_sub: {
        type: String
    },
    reply_text: {
        type: String
    }
});

module.exports = mongoose.model('Contactu', contactSchema);