const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../error')

/************************ login *************************/
const login = async (req, res) => {

  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new BadRequestError('Provide email and password')
  }

  const id = new Date().getDate()
  console.log('id --> '+id)

  const token = jwt.sign({username}, process.env.JWT_SECRET,{expiresIn:'30d'})
  console.log('token --> '+token)

  res.status(200).json({msg:'user created', token});
};

/************************ dashboard *************************/
const dashboard = async (req, res) => {
  console.log('dashboard : '+req.user)
   
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({msg:`Hello,  ${req.user.username}`, secret: `Your lucky Number is ${luckyNumber}` });
};

module.exports = { login, dashboard };
