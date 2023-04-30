const ContactUs = require('../Models/contactUs');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const postContactUs = (req, res, next) => {
    const name= req.body.name;
    const email = req.body.email;
    const title = req.body.subject;
    const content = req.body.message;

    const contactUs = new ContactUs({
        _id: new mongoose.Types.ObjectId(),
        authorName : name,
        email : email,
        title : title,
        content : content
    })
    contactUs
        .save()
        .then(result => {
            console.log("The Feedback was Sent : " + result);
            res.redirect('/')
        })
        .catch(err => {
            console.log("Error occured while Sending Feedback : " + err)
            res.redirect('/contactUs')
        })
}


module.exports = {postContactUs}