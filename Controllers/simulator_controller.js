const User = require('../Models/user');
const StockBuy = require('../Models/stock_buying');
const ArrayUser = require('../Models/UserArrays');
const Chart = require('../Models/chart');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

let allCompany = []
let allCommodity = []
let allForex = []
let allCrypto = []
let counterForAll = 0;
let totalSizeofCharts = 0;

const BuyTheStock = (req, res, next) => {
    const stockId = req.body.priceID; //Here I will get the id of the Stock
    Chart.findOne({ _id: new mongoose.Types.ObjectId(stockId) })
        .then(result => {
            //Here I got all the Details about the Stock
            //Now to check if the User can Buy the Stock
            if (UserController.session.costInHand >= result.chart_ltp) {
                const newPurchase = new StockBuy({
                    _id: new mongoose.Types.ObjectId(),
                    stockID: stockId,
                    userID: UserController.session.id,
                    stockName: result.chart_name,
                    purchasePrice: result.chart_ltp,
                    purchaseDate: new Date().toDateString(),
                    inPossesion: true
                })
                newPurchase
                    .save()
                    .then((resultOfPurchase) => {
                        ArrayUser.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.arrayID) }, {
                            $push: { ShareHoldingID: resultOfPurchase._id }
                        })
                            .then(resultOfSavingInUserPurchase => { //Updating the User Here : 
                                console.log("Stock Saved in User Array : " + resultOfSavingInUserPurchase)
                                UserController.session.costInvested += result.chart_ltp;
                                UserController.session.costInHand -= result.chart_ltp;
                                const user = new User({
                                    costInHand: UserController.session.costInHand,
                                    costInvested: UserController.session.costInvested,
                                    wallet: UserController.session.wallet
                                })
                                User.updateOne({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
                                    .then(result => {
                                        console.log("Stock Purchased Price Updated : " + result)
                                        res.redirect('/simulator')
                                    })
                                    .catch(err => {
                                        console.log("Error in err123 : " + err);
                                    })
                            })
                            .catch(errInStoringInUser => {
                                console.log("Error in Storing in User Array : " + errInStoringInUser)
                                res.redirect('/simulator')
                            })
                    })
                    .catch(errInPurchase => {
                        console.log("Error In Purchase : " + errInPurchase)
                        res.redirect('/simulator')
                    })
            } else {
                //Here then Write the Code for Cost Less in Hand (For now just redirect)
                console.log("Less Cash, Buy More Cash")
                res.redirect('/pricing')
            }
        })
        .catch(err => {
            console.log("Error Fetching the Stock : " + err)
            res.redirect('/simulator')
        })
}

let counterForGettingStockId = 0;
let counterForGettingStockDetails = 0;

const getAlltheBoughtStocks = async (req, res, next) => {
    let stockIds = []
    let transactionStockDetails = []
    let stockDetails = []
    await ArrayUser.findOne({ _id: new mongoose.Types.ObjectId(UserController.session.arrayID) })
        .then(async result => { // These are Transaction Id's
            const allTransactionId = result.ShareHoldingID;
            let sizeAllTransaction = allTransactionId.length
            console.log("The Size : " + sizeAllTransaction)
            for (let index = 0; index < sizeAllTransaction; index++) {
                const trans = await StockBuy.findOne({ _id: new mongoose.Types.ObjectId(allTransactionId[index]) })
                if (trans) {
                    stockIds.push(trans.stockID)
                    transactionStockDetails.push(trans)
                    counterForGettingStockId++;
                }
            }
            if (sizeAllTransaction == counterForGettingStockId) {
                counterForGettingStockId = 0;
                for (let index = 0; index < sizeAllTransaction; index++) {
                    const det = await Chart.findOne({ _id: new mongoose.Types.ObjectId(stockIds[index]) })
                    if (det) {
                        stockDetails.push(det);
                        counterForGettingStockDetails++;;
                    }
                }
                if (counterForGettingStockDetails == sizeAllTransaction) {
                    counterForGettingStockDetails = 0
                    await Chart.find()
                        .then(allCharts => {
                            const allChart = allCharts;
                            totalSizeofCharts = allChart.length
                            for (let index = 0; index < totalSizeofCharts; index++) {
                                if (allChart[index].type == "Company")
                                    allCompany.push(allChart[index]);
                                else if (allChart[index].type == "Commodity")
                                    allCommodity.push(allChart[index])
                                else if (allChart[index].type == "Forex")
                                    allForex.push(allChart[index])
                                else if (allChart[index].type == "Crypto")
                                    allCrypto.push(allChart[index])
                                counterForAll++;
                            }
                        })
                        .catch(errCharts => {
                            console.log("Error in fetching Charts : " + errCharts)
                        })
                    if (counterForAll == totalSizeofCharts) {
                        counterForAll = 0;
                        res.render('simulator', {
                            details: UserController.session,
                            stockTransactionDetails: transactionStockDetails,
                            stockDetails: stockDetails,
                            companyStock: allCompany,
                            commodityStock: allCommodity,
                            forexStock: allForex,
                            cryptoStock: allCrypto
                        })
                        allCompany = [];
                        allCommodity = [];
                        allForex = [];
                        allCrypto = [];
                    }
                }
            }
        })
        .catch(err => {
            console.log("Error in Finding the Stocks from User : " + err);
        })
}

const SellTheStock = async (req, res, next) => {

    const StockID = req.body.sellButton;
    const transactionID = req.body.transactionID;
    const purchaseValue = req.body.purchaseValue;
    const currentValue = req.body.currentValue;

    UserController.session.costInHand += +(currentValue)
    UserController.session.costInvested -= purchaseValue
    UserController.session.wallet = UserController.session.costInHand + UserController.session.costInvested;

    const userCostUpdate = new User({
        costInHand: UserController.session.costInHand,
        costInvested: UserController.session.costInvested,
        wallet: UserController.session.wallet
    })

    await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, userCostUpdate)
        .then(costUpdated => {
            console.log("The Cost after Selling : " + costUpdated)
        })
        .catch(costUpdateError => {
            console.log("Error in Updating Cost after Selling : " + costUpdateError)
        })
    const stockSell = new StockBuy({
        inPossesion: false
    })
    await StockBuy.updateOne({ _id: new mongoose.Types.ObjectId(transactionID) }, stockSell)
        .then(afterSelling => {
            console.log("The Stock is Sold : " + afterSelling)
            res.redirect('/simulator')
        })
        .catch(errorInSelling => {
            console.log("Error in Stock Selling : " + errorInSelling)
            res.redirect('/simulator')
        })
}

module.exports = { BuyTheStock, getAlltheBoughtStocks, SellTheStock };
