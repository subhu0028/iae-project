const { Double, Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = new Schema({
    chart_name: {
        type: String,
        required: true
    },
    chart_ltp: {
        type: Decimal128,
        required: true
    },
    chart_change: {
        type: Decimal128,
        required: true,
    },
    chart_percentage: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Chart', chartSchema);
