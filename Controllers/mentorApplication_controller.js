const MentorApplication = require('../Models/mentorApplication');
const mongoose = require('mongoose');
const UserController = require('./user_controller');
const path = require('path');

const postMentorApplication = (req, res, next) => {
    const application = new MentorApplication({
        _id : new mongoose.Types.ObjectId(),
        userID : UserController.session.id,
        userName : UserController.session.name,
        userEmail : UserController.session.email,
        country : req.body.mentorCountry,
        tradingExperience : req.body.mentorExperience,
        tradingStrategy : req.body.strategy,
        reasonMentor : req.body.why,
        certificationPath : req.body.certificate
    })
    application
        .save()
        .then(result => {
            console.log("The Mentor Application was submitted Successfully")
            res.render('mentorApplication',{status : "Submitted Successfully"})
        })
        .catch(err => {
            console.log("Mentor Application Process Denied")
            res.render('mentorApplication',{status : "Error in Submission"})
        })
}

module.exports = {postMentorApplication};
