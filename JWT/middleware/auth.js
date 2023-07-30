const jwt = require('jsonwebtoken')
//const CustomAPIError = require("../error/custom-error");
//const {UnAuthenticatedError} = require('../error/unauthenticated')
const {UnauthenticatedError} = require('../error')

const authenticationMiddleWare = async (req, res, next) => {
   
    const authHeader = req.headers.authorization
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      console.log('No token provided')
      //throw new CustomAPIError('No token provided',401)
      throw new UnauthenticatedError('No token provided')
    }
  
    const token = authHeader.split(' ')[1]
    console.log(token)

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(`decode values : ${decoded.username}  ${decoded.iat} ${decoded.exp}`)
        const {id, username} = decoded
        req.user = {id, username}
        next()
      }catch(error){
        console.log('No token provided')
        //throw new CustomAPIError('Not Authorized to access this route', 401)
        throw new UnauthenticatedError('Not Authorized to access this route')
      }
}

module.exports = authenticationMiddleWare
