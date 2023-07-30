
const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let customError = {
        // set status code
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong , try again later'
    }

    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({msg: err.message})
    // }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = 400
    }

    if ( err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }

    return res.status(customError.statusCode).json({msg: customError.msg})


/*
const errorHandler = (error, req, res, next) => {
    if(error instanceof CustomAPIError){
        console.log('error-handler ( Inside ) -> '+error.statusCode)
        return res.status(error.statusCode).json({msg: error.message})
    }
    console.log('error-handler (Outside )')
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')

    */
}

module.exports=errorHandler
