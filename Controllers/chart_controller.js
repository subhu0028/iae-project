const Chart = require('../Models/chart');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const getAllCharts = async (req, res, next) => {
    let allCompany = []
    let allCommodity = []
    let allForex = []
    let allCrypto = []
    let counterForAll = 0;
    let totalSizeofCharts = 0;

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
        res.render('charts', {
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

module.exports = { getAllCharts }