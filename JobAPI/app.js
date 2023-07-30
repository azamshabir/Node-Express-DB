require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// Connect DB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// Router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// Error Handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handlers')

app.use(express.json())

// Routes
app.use('/api/vi/auth', authRouter)
app.use('/api/vi/jobs', authenticateUser, jobsRouter)

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