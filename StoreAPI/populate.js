require("dotenv").config();

const connectDB = require("./store-db/connect");
const Product = require("./model/productModel");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    Product.deleteMany();
    await Product.create(jsonProducts)
    console.log('success connected to db')
    process.exit(0)
  } catch (error) {
    console.log(error);
  }
};

start()