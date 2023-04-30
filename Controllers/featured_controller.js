const Mentor = require('../Models/mentor');
const ArrayUser = require('../Models/UserArrays');
const User = require('../Models/user');
const mongoose = require('mongoose');
const UserController = require('./user_controller');
const UserArrays = require('../Models/UserArrays');

let counter = 0;

const postFeaturedSectionBlog = (req, res, next) => {
    const authorName = UserController.session.name;
    let mentorImage = "";
    const contentTitle = req.body.title;
    const content = req.body.content;
    const datetime = new Date().toDateString();
    console.log("time : " + datetime);
    let submittedBlogId = "";

    if (UserController.session.profileImage != "") {
        mentorImage = UserController.session.profileImage;
    } else {
        let x = Math.floor((Math.random() * 10) % 8 + 1);
        mentorImage = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";
    }

    const featuredSection = new Mentor({
        _id: new mongoose.Types.ObjectId(),
        mentorID: UserController.session.id,
        mentorName: authorName,
        mentorImage: mentorImage,
        mentorEmail: UserController.session.email,
        title: contentTitle,
        content: content,
        time: datetime
    })
    featuredSection
        .save()
        .then(result => {
            console.log("Featured Blog got posted : " + result)
            submittedBlogId = result._id;
            UserArrays.updateOne({ _id: new mongoose.Types.ObjectId(UserController.session.arrayID) }, {
                $push: {
                    MentorBlogID: submittedBlogId
                }
            }).then(resultofFinding => {
                console.log("It is Pushed : " + resultofFinding)
            })
                .catch(ErrInFinding => {
                    console.log("Error in Pushing : " + ErrInFinding)
                })
            res.redirect('/mentorPanel')
        })
        .catch(err => {
            console.log("Error Occured Posting the Blog : " + err)
        })
}

const getAllFeaturedBlogs = (req, res, next) => {
    Mentor.find()
        .exec()
        .then(result => {
            console.log("Successfully Fetched all Data : ")
            res.render('featured', { details: result })
        })
        .catch(err => {
            console.log("Error Occured Fetching Data : " + err)
            res.redirect('/')
        })
}

const getAllMentorBlogs = async (req, res, next) => {
    const allBlogs = []
    await ArrayUser.findOne({ _id: new mongoose.Types.ObjectId(UserController.session.arrayID) })
        .then(async result => {

            const arrayOfBlogs = result.MentorBlogID;
            let size = arrayOfBlogs.length;

            for (let index = 0; index < size; index++) {
                const mentorr = await Mentor.findOne({ _id: new mongoose.Types.ObjectId(arrayOfBlogs[index]) })
                if (mentorr) {
                    allBlogs.push(mentorr)
                    counter++;
                }
            }
            if (size == counter) {
                await res.render('mentorBlogs', { details: allBlogs })
                counter = 0;
            }
        })
        .catch(err => {
            res.redirect('/mentorPanel')
            console.log("getAllMentorBlogs error : " + err)
        })

}

const getSearchBlogs = (req, res, next) => {
    const sentQuery = req.body.mentorName;
    Mentor.find({ mentorName: { $regex: sentQuery, $options: 'i' } })
        .exec()
        .then(result => {
            console.log("Successfully Fetched all Data")
            res.render('featured', { details: result })
        })
        .catch(err => {
            console.log("Error Occured Fetching Data : " + err)
            res.redirect('/')
        })
}

const LikeThisPost = (req, res, next) => {
    const blogID = req.body.blogID;
    console.log("Given ID : " + blogID)
    Mentor.findById(blogID)
        .then(blog => {
            console.log("Fetched The Blog : " + blog);

            const allLiked = blog.likedBy;
            let size = allLiked.length

            if (allLiked.includes(UserController.session.id)) {
                for (let i = 0; i < size; i++) {
                    if (allLiked[i] == UserController.session.id) {
                        let spliced = allLiked.splice(i, 1);
                    }
                }
            } else {
                allLiked.push(UserController.session.id);
            }
            const blogger = new Mentor({
                likedBy: allLiked
            })
            Mentor.findByIdAndUpdate(blogID, blogger)
                .then(resultOFArray => {
                    console.log("Updated the Array when exists : " + resultOFArray)
                    res.redirect('/featured')
                })
                .catch(errArray => {
                    console.log("Error in Updating Array : " + errArray)
                })
        })
        .catch(errBlog => {
            console.log("Error in Fetching : " + errBlog);

        })
}

module.exports = { postFeaturedSectionBlog, getAllFeaturedBlogs, getAllMentorBlogs, getSearchBlogs, LikeThisPost };