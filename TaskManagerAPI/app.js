const express = require("express");
const app = express();
const task = require("./task");
const connectDB = require("./db/connect");
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

//middlewrae
app.use(express.json());
app.use(express.static('./public'))

app.use("/api/v1/task", task);
app.use(notFound)
app.use(errorHandler)

const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is connected to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start()
