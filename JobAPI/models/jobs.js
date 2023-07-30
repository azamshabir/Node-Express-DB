const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Provide Company Name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Provide Postion'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'decline', 'pending'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Provide User Name']
    }
}, {timestamps:true})


module.exports = mongoose.model('Job',JobSchema)