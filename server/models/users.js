const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },

    pet_name: {
        type:String
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

    dogRace: {
        type:mongoose.Types.ObjectId, ref:"DogRace"
    },

    expert: {
        type:mongoose.Types.ObjectId, ref:"Expert"
    },

    city: {
        type:mongoose.Types.ObjectId, ref:"City"
    },

    photo: {
        type:String,
    },

})

module.exports = mongoose.model('User', userSchema);