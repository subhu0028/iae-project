const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    mentorName: {
        type: String,
        required: true
    },
    mentorEmail: {
        type: String,
        required: true
    },
    mentorImage: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('Mentor', mentorSchema);

