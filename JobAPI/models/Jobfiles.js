const mongoose = require('mongoose')

const JobFileSchema = new mongoose.Schema({
    id:{
        type: mongoose.Types.ObjectId,
        ref:'Jobs',
        required:[true,'Provide Job Id']
    },
    file:{
        type: String, 
        required: true,
    }
})

module.exports = mongoose.model('JobFile', JobFileSchema)