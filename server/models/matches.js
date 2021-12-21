const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId, ref:"User"
    },
    trainer: {
        type:mongoose.Types.ObjectId, ref:"Trainer"
    }, 
    date: {
        type:Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Match', matchSchema);