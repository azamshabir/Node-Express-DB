require("dotenv").config();
require("express-async-errors");

//async errors

const express = require("express");
const app = express();
const connectDB = require("./store-db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store Api</h1>");
});

app.use("/api/v1/products", productsRouter);

//product routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // DB connect
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`SERVER is listening to PORT : ${port}`));
  } catch (error) {}
};

start();
