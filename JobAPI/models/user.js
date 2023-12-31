const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Provide Name'],
        minlength: 3,
        maxlength: 40
    },
    email:{
        type: String,
        required: [true, 'Provide Email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Provide valid Email Id'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Provide Password'],
        minlength: 6,
        //maxlength: 50,
    },
    role:{
        type: String,
        required: [true, 'Provide Role'],
        enum: {
            values: ['Advisor','SEVIS','User'],
            message:'{VALUE} is not suppported'
        }
    },
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

/*
UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name }, 'secretKey', {
        expiresIn: '30d',
    })
}
*/

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
} 

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User',UserSchema)