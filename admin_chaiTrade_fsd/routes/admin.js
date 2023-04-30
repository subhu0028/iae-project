const path = require('path');

const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();


// Users

router.get('/add-user', adminController.getAddUser);

router.post('/add-user', adminController.postAddUser);

router.get('/users', adminController.getUsers);

router.get('/admin/edit-user/:userId', adminController.getEditUser);

router.post('/admin/edit-user/edit-user', adminController.postEditUser);

router.post('/admin/delete-user', adminController.postDeleteUser);

// Mentors

router.get('/add-mentor', adminController.getAddMentor);

router.post('/add-mentor', adminController.postAddMentor);

router.get('/mentors', adminController.getMentors);

router.get('/admin/edit-mentor/:mentorId', adminController.getEditMentor);

router.post('/admin/edit-mentor/edit-mentor', adminController.postEditMentor);

router.post('/admin/delete-mentor', adminController.postDeleteMentor);

// FAQS

router.get('/add-faq', adminController.getAddFaq);

router.post('/add-faq', adminController.postAddFaq);

router.get('/faqs', adminController.getFaqs);

router.get('/admin/edit-faq/:faqId', adminController.getEditFaq);

router.post('/admin/edit-faq/edit-faq', adminController.postEditFaq);

router.post('/admin/delete-faq', adminController.postDeleteFaq);

// Blogs

router.get('/add-blog', adminController.getAddBlog);

router.post('/add-blog', adminController.postAddBlog);

router.get('/blogs', adminController.getBlogs);

router.get('/admin/edit-blog/:blogId', adminController.getEditBlog);

router.post('/admin/edit-blog/edit-blog', adminController.postEditBlog);

router.post('/admin/delete-blog', adminController.postDeleteBlog);

// Applications

router.get('/applications', adminController.getApplications);

router.get('/admin/edit-application/:applicationId', adminController.getEditApplicationMentor);

router.post('/admin/edit-application/edit-application', adminController.postEditApplication);

router.post('/admin/delete-blog', adminController.postDeleteApplication);

// Features

router.get('/add-feature', adminController.getAddFeature);

router.post('/add-feature', adminController.postAddFeature);

router.get('/features', adminController.getFeatures);

router.get('/admin/edit-feature/:featureId', adminController.getEditFeature);

router.post('/admin/edit-feature/edit-feature', adminController.postEditFeature);

router.post('/admin/delete-feature', adminController.postDeleteFeature);

// Contact Us

router.get('/add-contact', adminController.getAddContact);

router.post('/add-contact', adminController.postAddContact);

router.get('/contacts', adminController.getContacts);

router.get('/admin/edit-contact/:contactId', adminController.getEditContact);

router.post('/admin/edit-contact/edit-contact', adminController.postEditContact);

router.post('/admin/delete-contact', adminController.postDeleteContact);

// Contact Us

router.get('/add-chart', adminController.getAddChart);

router.post('/add-chart', adminController.postAddChart);

router.get('/charts', adminController.getCharts);

router.get('/admin/edit-chart/:chartId', adminController.getEditChart);

router.post('/admin/edit-chart/edit-chart', adminController.postEditChart);

router.post('/admin/delete-chart', adminController.postDeleteChart);


module.exports = router;
