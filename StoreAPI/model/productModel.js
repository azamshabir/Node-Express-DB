const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Input Product Name']
    },
    price:{
        type: Number,
        required: [true, 'Input Price']
    },
    featured:{
        type: Boolean,
        default: false,
    },
    rating: {
        type:Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum: {
            values: ['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not suppported'
        }
        //enum:['ikea','liddy','caressa','macros']
    }
})

module.exports = mongoose.model('Products', productSchema)