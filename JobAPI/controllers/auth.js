const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  /* const token = jwt.sign({ userId:user._id, name: user.name }, 'jwtSecret',
    {expiresIn: '30d', }) */

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

  /*
    console.log(req.body)
    const {name, email, password} = req.body
    const salt = await bcrypt.genSalt(10)
    console.log('salt : '+salt)

    const hashedPassword = await bcrypt.hash(password, salt)
    console.log('hashedPassword : '+hashedPassword)

    //  if(!name || !email || !password){
    //       throw new BadRequestError(' Mandatory Fields { Username , Email , Password is Mandatory } ')
    //  }

const tempUser = {name, email, password:hashedPassword}
const user = await User.create({ ...tempUser})

    res.status(StatusCodes.CREATED).json(user)
    //res.send('Register User')
*/
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Provide Email and Password");
  }

  const user = await User.findOne({email})
  if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Password')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user: {name: user.name}, token })

  //res.send('login User')
};

module.exports = { register, login };
