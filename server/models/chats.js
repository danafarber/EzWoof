const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender_id: {
        type:String,
        required: true,
    },
    msg: {
        type:String,
        required: true
    }
})

const chatsSchema = new mongoose.Schema({
    match: {
        type:mongoose.Types.ObjectId, ref:"Match",
    }, 
    messages:{
        type:[MessageSchema],
        default:undefined
    }
    
})

module.exports = mongoose.model('Chat', chatsSchema);