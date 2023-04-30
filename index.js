const express = require('express');
const path = require('path')

const UserController = require('./Controllers/user_controller');
const Blog_Controller = require('./Controllers/blog_controller')
const Featured_Controller = require('./Controllers/featured_controller')
const ContactUs_Controller = require('./Controllers/contactUs_controller')
const MarketTerm_Controller = require('./Controllers/marketTerm_controller')
const MentorApplication_Controller = require('./Controllers/mentorApplication_controller')
const News_Controller = require('./Controllers/news_controller')
const Pricing_Controller = require('./Controllers/pricing_controller')
const Simulator_Controller = require('./Controllers/simulator_controller')
const Chart_Simulator = require('./Controllers/chart_controller')

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://bennurdarshan:chaiTrade404@cluster0.psgtpad.mongodb.net/?retryWrites=true&w=majority');

const app = express();
var PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.locals.isLoggedIn = UserController.session.isSigned;
    res.locals.isMentorLoggedIn = UserController.session.isMentor;
    res.locals.isAdmin = UserController.session.isAdmin;
    res.locals.isPremium = UserController.session.isPremium;
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/charts', Chart_Simulator.getAllCharts)

app.get('/blog', Blog_Controller.getAllBlogs)

app.post('/postBlog', Blog_Controller.postBlog)

app.get('/featured', Featured_Controller.getAllFeaturedBlogs)

app.post('/postFeaturedBlog', Featured_Controller.postFeaturedSectionBlog)

app.get('/news', News_Controller.getAllNews)

app.post('/giveNews', News_Controller.getAllSearchedNews)

app.get('/simulator', Simulator_Controller.getAlltheBoughtStocks)

app.post('/buyThisStock', Simulator_Controller.BuyTheStock);

app.post('/sellThisShare', Simulator_Controller.SellTheStock)

app.get('/mentorApplication', (req, res) => {
    res.render('mentorApplication',{status : ""});
})

app.post('/postMentorApplication', MentorApplication_Controller.postMentorApplication)

app.get('/profile', (req, res) => {
    res.render('profile', {
        name: UserController.session.name,
        email: UserController.session.email,
        isSignedIn: UserController.session.isSigned,
        education: UserController.session.education,
        profileImage: UserController.session.profileImage,
        countryCode: UserController.session.countryCode,
        phoneNumber: UserController.session.phoneNumber,
        income: UserController.session.income,
        incomeType: UserController.session.incomeType,
        isMentor: UserController.session.isMentor
    });
})

app.post('/changesProfile', UserController.makeChanges)

app.get('/transactions', Pricing_Controller.getAllTransaction)

app.get('/signIn', (req, res) => {
    res.render('signIn', {
        errr: '',
        loginError: ''
    });
})

app.post('/signIn', UserController.RegisterUser)

app.post('/login', UserController.Login_User)

app.get('/logout', (req, res) => {
    UserController.LogoutSession()
    res.redirect('/')
})

app.get('/marketTerm', MarketTerm_Controller.getAllFAQ)

app.get('/aboutUs', async (req, res) => {
    res.render('about');
})

app.get('/pricing', async (req, res) => {
    res.render('pricing');
})

app.post('/purchasing20', Pricing_Controller.increase20K);

app.post('/purchasing40', Pricing_Controller.increase40K);

app.post('/makeMePremium', Pricing_Controller.makeUserPremium);

app.get('/contactUs', async (req, res) => {
    res.render('contactUs', {
        name: UserController.session.name,
        email: UserController.session.email
    });
})

app.post('/feedback', ContactUs_Controller.postContactUs)

app.get('/mentorPanel', (req, res) => {
    res.render('mentor_panel');
})

app.get('/mentorBlogs', Featured_Controller.getAllMentorBlogs)

app.post('/giveMentor', Featured_Controller.getSearchBlogs)

app.post('/likeThis', Featured_Controller.LikeThisPost)

app.get('*', (req, res) => {
    res.render('error')
});

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    }
    else
        console.log('Listening on port ', PORT);
})
