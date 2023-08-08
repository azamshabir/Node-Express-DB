const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class Forbidden extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
        console.log('Forbidden')
    }
}

module.exports = Forbidden

//https://www.youtube.com/watch?v=jI4K7L-LI58&t=1224s