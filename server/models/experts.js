const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('Expert', expertSchema);