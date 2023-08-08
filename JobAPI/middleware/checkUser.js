const User = require('../models/User')
const { Forbidden } = require('../errors')

const authRole =  (role) => {

    console.log(`Role => ${role}`)

    return async (req, res, next) => {
        const userId = req.User.userId
        console.log(`User Id => ${userId}`)
    
        const user = await User.findOne({_id: userId })
        console.log(user)
        console.log(`user role : ${user.role}`)
    
        if(role !== user.role){
            throw new Forbidden(`Forbidden. User with { Role : ${user.role} }, cannot acess this resource`)
        }

 /*       console.log('Status : '+ req.body.status)
        if(req.body.status){
            throw new Forbidden('Forbidden. No Acess Resource Field { Status } .')
        }

 */        
        next();
    }
   
}


module.exports = authRole