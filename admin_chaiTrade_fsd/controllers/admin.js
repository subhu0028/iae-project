
// Product -> User
const User = require('../models/user');

// User
exports.getAddUser = (req, res, next) => {
    res.render('admin/edit-user', {
        pageTitle: 'Add User',
        path: '/add-user',
        editing: false
    });
};

exports.postAddUser = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const user = new User({
        userName: userName,
        password: password,
        email: email
        });
    user
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/users');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getUsers = (req, res, next) => {
    User.find() 
        .then(users => {
            res.render('admin/users', {
                users: users,
                pageTitle: 'Users',
                path: '/users'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditUser = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const userId = req.params.userId;
    User.findById(userId) 
        .then(user => {
            if(!user) {
                return res.redirect('/');
            }
            res.render('admin/edit-user', {
                pageTitle: 'Edit User',
                path: '/admin/edit-user',
                editing: editMode,
                user: user
            });
        });
    
};

exports.postEditUser = (req, res, next) => {
    const userId = req.body.userId;
    const updatedUserName = req.body.userName;
    const updatedEmail = req.body.email;
    const updatedPass = req.body.password;
    
    User.findById(userId).then(user => {
        user.userName = updatedUserName;
        user.email = updatedEmail;
        user.password = updatedPass;
        return user.save()
    })
    
        .then(result => {
            console.log('UPDATED USER!');
            res.redirect('/users');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteUser = (req, res, next) => {
    const userId = req.body.userId;
    User.findByIdAndRemove(userId)
        .then(() => {
            console.log('DESTROYED USER');
            res.redirect('/users');
        })
        .catch(err => {
            console.log(err);
        })
};


// Mentors
const Mentor = require('../models/mentor');

exports.getAddMentor = (req, res, next) => {
    res.render('admin/edit-mentor', {
        pageTitle: 'Add Mentor',
        path: '/add-mentor',
        editing: false
    });
};

exports.postAddMentor = (req, res, next) => {
    const mentorName = req.body.mentorName;
    const mentorImage = re.body.mentorImage;
    const mentorEmail = req.body.mentorEmail;
    const mentor = new Mentor({
        mentorName: mentorName,
        mentorImage: mentorImage,
        mentorEmail: mentorEmail
        });
    mentor
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/mentors');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getMentors = (req, res, next) => {
    Mentor.find() 
        .then(mentors => {
            res.render('admin/mentors', {
                mentors: mentors,
                pageTitle: 'Mentors',
                path: '/mentors'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditMentor = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const mentorId = req.params.mentorId;
    Mentor.findById(mentorId) 
        .then(mentor => {
            if(!mentor) {
                return res.redirect('/');
            }
            res.render('admin/edit-mentor', {
                pageTitle: 'Edit Mentor',
                path: '/admin/edit-mentor',
                editing: editMode,
                mentor: mentor
            });
        });
    
};

exports.postEditMentor = (req, res, next) => {
    const mentorId = req.body.mentorId;
    const updatedMentorName = req.body.mentorName;
    const updatedEmail = req.body.mentorEmail;
    const updatedImage = req.body.mentorImage;
    
    Mentor.findById(mentorId).then(mentor => {
        mentor.mentorName = updatedMentorName;
        mentor.mentorEmail = updatedEmail;
        mentor.mentorImage = updatedImage;
        return mentor.save()
    })
    
        .then(result => {
            console.log('UPDATED MENTOR!');
            res.redirect('/mentors');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteMentor = (req, res, next) => {
    const mentorId = req.body.mentorId;
    Mentor.findByIdAndRemove(mentorId)
        .then(() => {
            console.log('DESTROYED MENTOR');
            res.redirect('/mentors');
        })
        .catch(err => {
            console.log(err);
        })
};


// FAQS - changed Faq -> faq in the schema 

const Faq = require('../models/faq');

exports.getAddFaq = (req, res, next) => {
    res.render('admin/edit-faq', {
        pageTitle: 'Add Faq',
        path: '/add-faq',
        editing: false
    });
};

exports.postAddFaq = (req, res, next) => {
    const question = req.body.question;
    const answer = req.body.answer;
    const faq = new Faq({
        question: question,
        answer: answer
        });
    faq
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/faqs');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getFaqs = (req, res, next) => {
    Faq.find() 
        .then(faqs => {
            res.render('admin/faqs', {
                faqs: faqs,
                pageTitle: 'FAQS',
                path: '/faqs'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditFaq = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const faqId = req.params.faqId;
    Faq.findById(faqId) 
        .then(faq => {
            if(!faq) {
                return res.redirect('/');
            }
            res.render('admin/edit-faq', {
                pageTitle: 'Edit FAQ',
                path: '/admin/edit-faq',
                editing: editMode,
                faq: faq
            });
        });
    
};

exports.postEditFaq = (req, res, next) => {
    const faqId = req.body.faqId;
    const updatedQuestion = req.body.question;
    const updatedAnswer = req.body.answer;
    
    Faq.findById(faqId).then(faq => {
        faq.question = updatedQuestion;
        faq.answer = updatedAnswer;
        return faq.save()
    })
    
        .then(result => {
            console.log('UPDATED FAQ!');
            res.redirect('/faqs');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteFaq = (req, res, next) => {
    const faqId = req.body.faqId;
    Faq.findByIdAndRemove(faqId)
        .then(() => {
            console.log('DESTROYED FAQ');
            res.redirect('/faqs');
        })
        .catch(err => {
            console.log(err);
        })
};


// Blogs

const Blog = require('../models/blog');

exports.getAddBlog = (req, res, next) => {
    res.render('admin/edit-blog', {
        pageTitle: 'Add Blog',
        path: '/add-blog',
        editing: false
    });
};

exports.postAddBlog = (req, res, next) => {
    const authorName = req.body.authorName;
    const authorAvatar = req.body.authorAvatar;
    const title = req.body.title;
    const content = req.body.content;
    const blog = new Blog({
        authorName: authorName,
        authorAvatar: authorAvatar,
        title: title,
        content: content
        });
    blog
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getBlogs = (req, res, next) => {
    Blog.find() 
        .then(blogs => {
            res.render('admin/blogs', {
                blogs: blogs,
                pageTitle: 'Blogs',
                path: '/blogs'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditBlog = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const blogId = req.params.blogId;
    Blog.findById(blogId) 
        .then(blog => {
            if(!blog) {
                return res.redirect('/');
            }
            res.render('admin/edit-blog', {
                pageTitle: 'Edit Blog',
                path: '/admin/edit-blog',
                editing: editMode,
                blog: blog
            });
        });
    
};

exports.postEditBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    const updatedAuthorName = req.body.authorName;
    const updatedAuthorAvatar = req.body.authorAvatar;
    const updatedTitle = req.body.title;
    const updatedBlog = req.body.content;
    
    Blog.findById(blogId).then(blog => {
        blog.authorName = updatedAuthorName;
        blog.authorAvatar = updatedAuthorAvatar;
        blog.title = updatedTitle;
        blog.content = updatedBlog;
        return blog.save()
    })
    
        .then(result => {
            console.log('UPDATED BLOG!');
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    Blog.findByIdAndRemove(blogId)
        .then(() => {
            console.log('DESTROYED BLOG');
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
};


// Applications

const Application = require('../models/application');
/* 
exports.getAddApplication = (req, res, next) => {
    res.render('admin/edit-blog', {
        pageTitle: 'Add Blog',
        path: '/add-blog',
        editing: false
    });
};

exports.postAddBlog = (req, res, next) => {
    const content = req.body.content;
    const blog = new Blog({
        content: content
        });
    blog
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
};
 */
exports.getApplications = (req, res, next) => {
    Application.find() 
        .then(applications => {
            res.render('admin/applications', {
                applications: applications,
                pageTitle: 'Applications',
                path: '/applications'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditApplicationMentor = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const applicationId = req.params.applicationId;
    Application.findById(applicationId) 
        .then(application => {
            if(!application) {
                return res.redirect('/');
            }
            res.render('admin/edit-application', {
                pageTitle: 'Edit Application',
                path: '/admin/edit-application',
                editing: editMode,
                application: application
            });
        });
    
};

exports.postEditApplication = (req, res, next) => {
    /* 
    const applicationId = req.body.applicationId;
    const mentorName = req.body.mentorName;
    const email = req.body.mentorEmail; */

    /* const mentor = new Mentor({
        mentorName: mentorName,
        mentorEmail: email
        });
    mentor
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/mentors');
        })
        .catch(err => {
            console.log(err);
        })
        
        Application.findByIdAndRemove(applicationId)
        .then(() => {
            res.redirect('/mentors');
        })
        .catch(err => {
            console.log(err);
        })
 */
        const userId = req.body.userID;
        const updatedIsMentor = new User({
            isMentor : true
        })
        console.log(userId);
        User.findByIdAndUpdate(userId, updatedIsMentor)
        .then((result) => {
            console.log(result);
            res.redirect('/applications');
        })
        .catch(err => {
            console.log(err);
        })
        const applicationId = req.body.applicationId;
        Application.findByIdAndRemove(applicationId)
        .then(() => {
            res.redirect('/applications');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteApplication = (req, res, next) => {
    const applicationId = req.body.applicationId;
    Application.findByIdAndRemove(applicationId)
        .then(() => {
            console.log('REJECTED');
            res.redirect('/applications');
        })
        .catch(err => {
            console.log(err);
        })
};


// Features

const Feature = require('../models/mentor');

exports.getAddFeature = (req, res, next) => {
    res.render('admin/edit-feature', {
        pageTitle: 'Add Feature',
        path: '/add-feature',
        editing: false
    });
};

exports.postAddFeature = (req, res, next) => {
    const mentorName = req.body.mentorName;
    const content = req.body.content;
    const feature = new Feature({
        mentorName: mentorName,
        content: content
        });
    feature
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/features');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getFeatures = (req, res, next) => {
    Feature.find() 
        .then(features => {
            res.render('admin/features', {
                features: features,
                pageTitle: 'Features',
                path: '/features'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditFeature = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const featureId = req.params.featureId;
    Feature.findById(featureId) 
        .then(feature => {
            if(!feature) {
                return res.redirect('/');
            }
            res.render('admin/edit-feature', {
                pageTitle: 'Edit Feature',
                path: '/admin/edit-feature',
                editing: editMode,
                feature: feature
            });
        });
    
};

exports.postEditFeature = (req, res, next) => {
    const featureId = req.body.featureId;
    const updatedMentorName = req.body.mentorName;
    const updatedMentorImage = req.body.mentorImage;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    
    Feature.findById(featureId).then(feature => {
        feature.mentorName = updatedMentorName;
        feature.mentorImage = updatedMentorImage;
        feature.title = updatedTitle;
        feature.content = updatedContent;
        return feature.save()
    })
    
        .then(result => {
            console.log('UPDATED FEATURE!');
            res.redirect('/features');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteFeature = (req, res, next) => {
    const featureId = req.body.featureId;
    Feature.findByIdAndRemove(featureId)
        .then(() => {
            console.log('DESTROYED FEATURE!');
            res.redirect('/features');
        })
        .catch(err => {
            console.log(err);
        })
};


// Contact Us

const Contact = require('../models/contact');

exports.getAddContact = (req, res, next) => {
    res.render('admin/edit-contact', {
        pageTitle: 'Add Contact',
        path: '/add-contact',
        editing: false
    });
};

exports.postAddContact = (req, res, next) => {
    const authorName = req.body.authorName;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const contact = new Contact({
        authorName: authorName,
        email: email,
        title: title,
        content: content
        });
    contact
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/contacts');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getContacts = (req, res, next) => {
    Contact.find() 
        .then(contacts => {
            res.render('admin/contacts', {
                contacts: contacts,
                pageTitle: 'Contacts',
                path: '/contacts'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditContact = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const contactId = req.params.contactId;
    Contact.findById(contactId) 
        .then(contact => {
            if(!contact) {
                return res.redirect('/');
            }
            res.render('admin/edit-contact', {
                pageTitle: 'Edit Contact',
                path: '/admin/edit-contact',
                editing: editMode,
                contact: contact
            });
        });
    
};

var nodemailer = require('nodemailer');     // nodemailer

exports.postEditContact = (req, res, next) => {
    const contactId = req.body.contactId;
    /* const updatedAuthorName = req.body.authorName;
    const updatedEmail = req.body.email;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content; */
    const reply_sub = req.body.reply_sub;
    const reply_text = req.body.reply_text;
    const email = req.body.email;
    
    Contact.findById(contactId).then(contact => {
        /* contact.authorName = updatedAuthorName;
        contact.email = updatedEmail;
        contact.title = updatedTitle;
        contact.content = updatedContent; */
        contact.reply_sub = reply_sub;
        contact.reply_text = reply_text;
        return contact.save()
    })
    
        .then(result => {
            /* var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'chaitrade404@gmail.com',
                pass: 'chaiTrade@404'
                }
            });
            
            var mailOptions = {
                from: 'chaitrade404@gmail.com',
                to: email,
                subject: reply_sub,
                text: reply_text
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            }); */
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                user: 'chaitrade404@gmail.com',
                pass: 'vfihpokrnfmghgkq',
                },
                });
                
                /* const sendEmail = (email, token) => { */
                const mailOptions = {
                    from: 'chaitrade404@gmail.com',
                    to: email,
                    subject: reply_sub,
                    text: reply_text
                };
                
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                    console.log('Error in sending email  ' + error);
                    return true;
                    } else {
                    console.log('Email sent: ' + info.response);
                    return false;
                    }
                });
                /* }; */
            console.log('UPDATED Contact!');
            res.redirect('/contacts');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteContact = (req, res, next) => {
    const contactId = req.body.contactId;
    Contact.findByIdAndRemove(contactId)
        .then(() => {
            console.log('DESTROYED Contact!');
            res.redirect('/contacts');
        })
        .catch(err => {
            console.log(err);
        })
};



// Charts

const Chart = require('../models/chart');

exports.getAddChart = (req, res, next) => {
    res.render('admin/edit-chart', {
        pageTitle: 'Add Chart',
        path: '/add-chart',
        editing: false
    });
};

exports.postAddChart = (req, res, next) => {
    const name = req.body.chart_name;
    const ltp = req.body.chart_ltp;
    const change = req.body.chart_change;
    const percentage = req.body.chart_percentage;
    const type = req.body.type;
    const chart = new Chart({
        chart_name: name,
        chart_ltp: ltp,
        chart_change: change,
        chart_percentage: percentage,
        type: type
        });
    chart
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/charts');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getCharts = (req, res, next) => {
    Chart.find() 
        .then(charts => {
            res.render('admin/charts', {
                charts: charts,
                pageTitle: 'Charts',
                path: '/charts'
            });
        })
        .catch(err => console.log(err));
};  

exports.getEditChart = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const chartId = req.params.chartId;
    Chart.findById(chartId) 
        .then(chart => {
            if(!chart) {
                return res.redirect('/');
            }
            res.render('admin/edit-chart', {
                pageTitle: 'Edit Chart',
                path: '/admin/edit-chart',
                editing: editMode,
                chart: chart
            });
        });
    
};

exports.postEditChart = (req, res, next) => {
    const chartId = req.body.chartId;
    const name = req.body.chart_name;
    const ltp = req.body.chart_ltp;
    const change = req.body.chart_change;
    const percentage = req.body.chart_percentage;
    const type = req.body.type;
    
    Chart.findById(chartId).then(chart => {
        chart.chart_name = name;
        chart.chart_ltp = ltp;
        chart.chart_change = change;
        chart.chart_percentage = percentage;
        chart.type = type;
        return chart.save()
    })
    
        .then(result => {
            console.log('UPDATED Chart!');
            res.redirect('/charts');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postDeleteChart = (req, res, next) => {
    const chartId = req.body.chartId;
    Chart.findByIdAndRemove(chartId)
        .then(() => {
            console.log('DESTROYED Chart!');
            res.redirect('/charts');
        })
        .catch(err => {
            console.log(err);
        })
};

/* 
const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
    user: 'niazi@gmail.com',
    pass: 'rkancqhzgvmzsdaqyx',
   },
  });

  const sendEmail = (email, token) => {
   const mailOptions = {
    from: 'niazi@gmail.com',
    to: email,
    subject: 'Email verification',
    html:
  '<p>Please click on the following link to verify your email address:</p>' +
  '<a href="http://localhost:3000/verify/' +
  token +
  '">http://localhost:3000/verify/' +
  token +
    '</a>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error in sending email  ' + error);
      return true;
    } else {
     console.log('Email sent: ' + info.response);
     return false;
    }
   });
  };

  module.exports = sendEmail; */