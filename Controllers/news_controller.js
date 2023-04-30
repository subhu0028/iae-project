const News = require('../Models/news');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const getAllNews = (req, res,next) => {
    News.find()
        .select("image title headlines url")
        .exec()
        .then(result => {
            console.log("News Fetched")
            res.render('news',{details:result})
        })
        .catch(err => {
            console.log("Error in Fetching News")
        })
}

const getAllSearchedNews = (req, res, next) => {
    const sentQuery = req.body.newsName
    News.find({headlines : {$regex : sentQuery, $options:'i'}})
        .select("image title headlines url")
        .exec()
        .then(result => {
            console.log("News Fetched")
            res.render('news',{details:result})
        })
        .catch(err => {
            console.log("Error in Fetching News")
        })
}

module.exports = {getAllNews, getAllSearchedNews};