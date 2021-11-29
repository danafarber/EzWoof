const mongoose = require('mongoose');

const citiesSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    english_name: {
        type:String,
    },
    long: {
        type:String,
    },
    latt: {
        type: String,
    }
})

module.exports = mongoose.model('City', citiesSchema);