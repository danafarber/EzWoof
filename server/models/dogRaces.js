const mongoose =require('mongoose')

const dogRaceSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('DogRace', dogRaceSchema);