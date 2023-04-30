const User = require('../Models/user');
const Transaction = require('../Models/transaction')
const mongoose = require('mongoose');
const UserController = require('./user_controller');
const UserArrays = require('../Models/UserArrays');

const increase20K = (req, res, next) => {
    const trans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        userID: UserController.session.id,
        amount: 50,
        Date: new Date().toDateString(),
        typeOfTransaction: "Simulator Pro"
    })
    trans
        .save()
        .then(savedToTransaction => {
            console.log("Saved in Transaction : " + savedToTransaction);
            UserArrays.findByIdAndUpdate(UserController.session.arrayID, {
                $push: {
                    transactionID: savedToTransaction._id
                }
            })
                .then(savedtoArray => {
                    console.log("Saved to Transaction Array : " + savedtoArray);
                    const user = new User({
                        costInHand: 20000 + UserController.session.costInHand,
                        wallet: 20000 + UserController.session.wallet
                    })
                    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
                        .then(result => {
                            console.log("Added 20,000 in the Wallet and InHand : " + result);
                            UserController.session.costInHand = 20000 + UserController.session.costInHand;
                            UserController.session.wallet = 20000 + UserController.session.wallet;
                            res.redirect('/simulator')
                        })
                        .catch(err => {
                            console.log("Error Increasing 20,000 Credits")
                        })
                })
                .catch(errinArray => {
                    console.log("Error in Storing in Array : " + errinArray)
                })
        })
        .catch(errInTransaction => {
            console.log("Error in Saving Transactions : " + errInTransaction);
        })
}

const increase40K = (req, res, next) => {
    const trans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        userID: UserController.session.id,
        amount: 100,
        Date: new Date().toDateString(),
        typeOfTransaction: "Simulator Premium"
    })
    trans
        .save()
        .then(savedToTransaction => {
            console.log("Saved in Transaction : " + savedToTransaction);
            UserArrays.findByIdAndUpdate(UserController.session.arrayID, {
                $push: {
                    transactionID: savedToTransaction._id
                }
            })
                .then(savedtoArray => {
                    console.log("Saved to Transaction Array : " + savedtoArray);
                    const user = new User({
                        costInHand: 40000 + UserController.session.costInHand,
                        wallet: 40000 + UserController.session.wallet
                    })
                    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
                        .then(result => {
                            console.log("Added 40,000 in the Wallet and InHand : " + result);
                            UserController.session.costInHand = 40000 + UserController.session.costInHand;
                            UserController.session.wallet = 40000 + UserController.session.wallet;
                            res.redirect('/simulator')
                        })
                        .catch(err => {
                            console.log("Error Increasing 40,000 Credits")
                        })
                })
                .catch(errinArray => {
                    console.log("Error in Storing in Array : " + errinArray)
                })
        })
        .catch(errInTransaction => {
            console.log("Error in Saving Transactions : " + errInTransaction);
        })
}

const makeUserPremium = (req, res, next) => {
    const trans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        userID: UserController.session.id,
        amount: 30,
        Date: new Date().toDateString(),
        typeOfTransaction: "Premium Purchase"
    })
    trans
        .save()
        .then(savedToTransaction => {
            console.log("Saved in Transaction : " + savedToTransaction);
            UserArrays.findByIdAndUpdate(UserController.session.arrayID, {
                $push: {
                    transactionID: savedToTransaction._id
                }
            })
                .then(savedtoArray => {
                    console.log("Saved to Transaction Array : " + savedtoArray);
                    const user = new User({
                        isPremium: true
                    })
                    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
                        .then(result => {
                            console.log("The User is now a Premium Member : " + result)
                            UserController.session.isPremium = true;
                            res.redirect('/featured')
                        })
                        .catch(err => {
                            console.log("Error making user Premium")
                        })
                })
                .catch(errinArray => {
                    console.log("Error in Storing in Array : " + errinArray)
                })
        })
        .catch(errInTransaction => {
            console.log("Error in Saving Transactions : " + errInTransaction);
        })
}

const getAllTransaction = (req, res, next) => {
    let allTransArray = []
    let counter = 0;
    UserArrays.findById(UserController.session.arrayID)
        .then(async gotArray => {
            console.log("Fetched the Array : " + gotArray)
            const transID = gotArray.transactionID;
            const size = transID.length

            for (let index = 0; index < size; index++) {
                const tran123 = await Transaction.findById(transID[index])
                if(tran123){
                    console.log("Transaction : " + tran123)
                    allTransArray.push(tran123)
                    counter++;
                }
            }
            if(counter == size){
                counter = 0;
                res.render('transaction',{
                    details : allTransArray
                })
                allTransArray = [];
            }
        })
        .catch(err => {
            console.log("Error in Fetching the Array : " + err)
        })
}

module.exports = { increase20K, increase40K, makeUserPremium, getAllTransaction };