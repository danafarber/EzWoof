const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },

    registrationDate: {
        type:Date,
        default: Date.now,
    },

    dogRaces: {
        type:mongoose.Types.ObjectId, ref:"DogRace"
    },

    experience: {
        type:Number,
    },

    expert: {
        type:mongoose.Types.ObjectId, ref:"Expert"
    },

    location: {
        type:mongoose.Types.ObjectId, ref:"City"
    },

    tip: {
        type:String,
    },

    photos: {
        type:[String],
    },

    pricing: {
        type:Number,
    }


})

module.exports = mongoose.model('Trainer', trainerSchema);