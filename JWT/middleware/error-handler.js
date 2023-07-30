
const CustomAPIError = require('../error/custom-error')
const {StatusCodes} = require('http-status-codes')

const errorHandler = (error, req, res, next) => {
    if(error instanceof CustomAPIError){
        console.log('error-handler ( Inside ) -> '+error.statusCode)
        return res.status(error.statusCode).json({msg: error.message})
    }
    console.log('error-handler (Outside )')
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports=errorHandler
