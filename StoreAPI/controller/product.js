const Product = require("../model/productModel");

const getAllProductsStatic = async (req, res) => {
  const product = await Product.find({price:{$gt:100}}).select("name price").sort('price');
  // -price : descending
  //const product = await Product.find({featured:true})
  res.status(200).json({records: product.length, product});
};

/*
const getAllProductsStatic = async (req, res) => {
    const product = await Product.find({}).sort('price')
    // -price : descending
    //const product = await Product.find({featured:true})
    res.status(200).json({product, nbHits:product.length})
}
*/

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  console.log(featured, company, name, sort, fields);
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    //queryObject.name = name
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  //const product = await Product.find(queryObject)
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  //select
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // page & limit
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

   result = result.skip(skip).limit(limit)

  const product = await result;
  res
    .status(200)
    .json({ records: product.length, product /*, nbHits: product.length*/ });
};

/*
const getAllProducts = async (req, res) => {
    console.log(req.query)
    const product = await Product.find(req.query)
    res.status(200).json({product, nbHits:product.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query;
    console.log(featured, company, name);
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }

    if(company){
        queryObject.company = company
    }

    if(name){
        //queryObject.name = name
        queryObject.name = {$regex: name, $options: 'i'}
    }

    console.log(queryObject)
    const product = await Product.find(queryObject)
    res.status(200).json({product, nbHits: product.length})
}

/*
EndPoints : 
http://localhost:3000/api/v1/products?featured=true&company=ikea
http://localhost:3000/api/v1/products?sort=name,price&fields=company,rating
http://localhost:3000/api/v1/products?sort=name,price&fields=company,rating&limit=2&page=4
http://localhost:3000/api/v1/products?sort=name,price&fields=company,rating,price&numericFilters=price>100,rating>4.5
*/

module.exports = { getAllProductsStatic, getAllProducts };
