require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

// Connect DB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')
const checkRoles = require('./middleware/checkUser')

// Router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const statusRouter  = require('./routes/status')


// Error Handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handlers')

app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload())

// Routes
app.use('/api/vi/auth', authRouter)
app.use('/api/vi/jobs', authenticateUser, checkRoles('Advisor'), jobsRouter)
//app.use('/api/vi/jobs', jobsRouter)
app.use('/api/vi/sevis', authenticateUser, checkRoles('SEVIS'), statusRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
   await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`SERVER is listening to PORT : ${port}`));
  } catch (error) {
    console.log(error)
  }
};

start();