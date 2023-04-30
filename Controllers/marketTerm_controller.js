const MarketTerm = require('../Models/marketTerms');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const getAllFAQ = (req, res, next) => {
    MarketTerm.find()
        .select('question answer')
        .exec()
        .then(result => {
            res.render('marketTerm', {details:result})
        })
        .catch(err => {
            console.log("Error Fetching : " + err)
            res.redirect('/')
        })
}

module.exports = {getAllFAQ}