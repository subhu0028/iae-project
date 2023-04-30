const User = require('../Models/user');
const ArrayUSer = require('../Models/UserArrays')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const session = {
    id: "",
    arrayID : "",
    name: "",
    email: "",
    isSigned: false,
    profileImage: "",
    education: "",
    countryCode: 0,
    phoneNumber: 0,
    income: 0,
    incomeType: "",
    isMentor: false,
    isAdmin: false,
    isPremium: false,
    costInHand: 0,
    costInvested: 0,
    wallet: 0
}

const RegisterUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if (!name || !email || !password) {
        res.render('signIn', {
            errr: "Fields Can't be Empty",
            loginError: ""
        });
    }
    else if (!email.match(mailformat)) {
        res.render('signIn', {
            errr: "Email is in Invalid Format",
            loginError: ""
        });
    }
    else if (!password.match(passwordFormat)) {
        res.render('signIn', {
            errr: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
            loginError: ""
        });
    }
    else {
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    res.render('signIn', {
                        errr: "Email Already Registered!!",
                        loginError: ""
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                userName: req.body.name,
                                password: hash,
                                isMentor: false,
                                isAdmin: false,
                                isPremium: false,
                                costInHand: 500,
                                costInvested: 0,
                                wallet: 500
                            });
                            user
                                .save()
                                .then(async result => {
                                    session.id = result._id;
                                    session.name = result.userName;
                                    session.email = result.email;
                                    session.isSigned = true;
                                    session.profileImage = result.profileImage;
                                    session.education = result.education;
                                    session.countryCode = result.countryCode;
                                    session.phoneNumber = result.phoneNumber;
                                    session.income = result.income;
                                    session.isAdmin = result.isAdmin;
                                    session.incomeType = result.incomeType;
                                    session.isPremium = result.isPremium;
                                    session.costInHand = result.costInHand;
                                    session.costInvested = result.costInvested;
                                    session.wallet = result.wallet;
                                    const arrayUser = new ArrayUSer({
                                        _id : new mongoose.Types.ObjectId(),
                                        userID : result._id,
                                    })
                                    await arrayUser.save()
                                        .then(resultOFArray => {
                                            console.log("User Array Created : " + resultOFArray);
                                            session.arrayID = resultOFArray._id;
                                            const userUpdate = new User({
                                                arrayID : resultOFArray._id
                                            })
                                            User.updateOne({ _id: new mongoose.Types.ObjectId(result._id)}, userUpdate)
                                                .then(arrayIDUpdated => {
                                                    console.log("Array Id Updated : " + arrayIDUpdated)
                                                })
                                                .catch(arrayIDError => {
                                                    console.log("Array ID Error : " + arrayIDError)
                                                })
                                        })
                                        .catch(someError => {
                                            console.log("Error in Array User Creation : "  + someError);
                                        })
                                    res.redirect('/profile')
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({
                                        error: err
                                    });
                                })
                        }
                    })
                }
            })
    }
}

const Login_User = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email || !password) {
        res.render('signIn', {
            errr: "",
            loginError: "Field Can't be Empty"
        });
    }
    else if (!email.match(emailFormat)) {
        res.render('signIn', {
            errr: "",
            loginError: "Invalid Email Format"
        });
    }
    else {
        User.find({ email: req.body.email })
            .exec()
            .then(result => {
                if (result.length < 1) {
                    res.render('signIn', {
                        errr: "",
                        loginError: "Invalid Credentials"
                    });
                }
                bcrypt.compare(req.body.password, result[0].password, (err, done) => {
                    if (err) {
                        res.render('signIn', {
                            errr: "",
                            loginError: "Invalid Credentials"
                        });
                    }
                    if (done) {
                        session.id = result[0]._id;
                        session.arrayID = result[0].arrayID;
                        session.name = result[0].userName;
                        session.email = result[0].email;
                        session.isSigned = true;
                        session.education = result[0].education;
                        session.profileImage = result[0].profileImage;
                        session.countryCode = result[0].countryCode;
                        session.phoneNumber = result[0].phoneNumber;
                        session.income = result[0].income;
                        session.incomeType = result[0].incomeType;
                        session.isMentor = result[0].isMentor;
                        session.isAdmin = result[0].isAdmin;
                        session.isPremium = result[0].isPremium;
                        session.costInHand = result[0].costInHand;
                        session.costInvested = result[0].costInvested;
                        session.wallet = result[0].wallet;
                        res.redirect('/profile')
                    }
                    res.render('signIn', {
                        errr: "",
                        loginError: "Invalid Credentials"
                    });
                })
            })
            .catch(err => {
                console.log(err)
                res.render('signIn', {
                    errr: "",
                    loginError: "Invalid Credentials"
                });
            })
    }
}

const LogoutSession = () => {
    const user = new User({
        costInHand: session.costInHand,
        costInvested: session.costInvested,
        wallet: session.wallet
    })
    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(session.id) }, user)
        .then(result => {
            console.log("Logout : " + result)
        })
        .catch(err => {
            console.log("Error in err123 : " + err);
        })
    session.id = "";
    session.name = "";
    session.email = "";
    session.isSigned = false;
    session.education = "";
    session.countryCode = 0;
    session.phoneNumber = 0;
    session.arrayID = "";
    session.income = 0;
    session.incomeType = "";
    session.isMentor = false;
    session.profileImage = "";
    session.isAdmin = "";
    session.isPremium = false;
}

const makeChanges = (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        education: req.body.education,
        countryCode: req.body.countrycode,
        phoneNumber: req.body.userPhone,
        profileImage: req.body.userProfileImage,
        income: req.body.incomeAmount,
        incomeType: req.body.incomeCode,
    });
    User.findOneAndUpdate({ email: req.body.email }, user)
        .then(result => {
            console.log("User Updated 123 : " + result.userName);
            session.name = req.body.userName;
            session.email = result.email;
            session.isSigned = true;
            session.education = req.body.education;
            session.countryCode = req.body.countrycode;
            session.profileImage = req.body.userProfileImage;
            session.phoneNumber = req.body.userPhone;
            session.income = req.body.incomeAmount;
            session.incomeType = req.body.incomeCode;
            res.redirect('/profile')
        })
        .catch(err => {
            console.log("Error Updating the User : " + err)
        })
}

module.exports = { session, RegisterUser, Login_User, makeChanges, LogoutSession };