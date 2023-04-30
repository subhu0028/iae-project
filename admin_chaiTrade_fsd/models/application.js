const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MentorApplicationSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    tradingExperience: {
        type: String,
        required: true
    },
    tradingStrategy: {
        type: String,
        required: true
    },
    reasonMentor: {
        type: String,
        required: true
    },
    certificationPath: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MentorApplication', MentorApplicationSchema);
