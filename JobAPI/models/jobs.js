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
        enum: ['Pending' , 'Submitted' , 'Approved', 'Reject', 'Assign Back'], 
        default: 'Pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Provide User Name']
    },
    ApprovedBy:{
        type: mongoose.Types.ObjectId,
        //ref:'User',
        //required:[true,'Provide User Name'],
        default: null
    },
    ApprovedDate:{
        type: Date,
        //ref:'User',
        //required:[true,'Provide User Name'],
        default: null
    },
    ApproverComments:{
        type: String,
        default: null,
    },
},{timestamps:true},

)


module.exports = mongoose.model('Job',JobSchema)