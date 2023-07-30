require("dotenv").config();
require("express-async-errors");

//async errors

const express = require("express");
const app = express();

const mainRouter = require('./routes/main');
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static("./public"));
app.use(express.json());


app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, console.log(`SERVER is listening to PORT : ${port}`));
  } catch (error) {}
};

start();
