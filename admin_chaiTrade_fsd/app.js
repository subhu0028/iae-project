const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose'); 

const errorController = require('./controllers/error.js');

const app = express(); 

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// don't add './admin' here idkwhy
app.use( adminRoutes);

app.use(errorController.get404);

mongoose
.connect(
    'mongodb+srv://bennurdarshan:chaiTrade404@cluster0.psgtpad.mongodb.net/?retryWrites=true&w=majority'
    )
.then(result => {
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});