const express = require('express');
const app = express();
const {products} = require('./data')

/*
app.get('/',(req, res) => {
    //res.status(200).send('Home page')
    res.json([{name:'sreejith'},{name:'kumaran'}])
})
*/


app.get('/',(req, res) => {
    //res.status(200).send('Home page')
    console.log('Home')
    res.json(products)
})


app.get('/api/products',(req,res) => {
    const newProduct = products.map((product) => {
        const {id,name,desc} = product;
        return {id,name,desc};
    })
    res.json(newProduct)
})

app.get('/api/products/:productId', (req, res) => {
    console.log(req.params)
    const {productId} = req.params;
    const singleProduct = products.find((product) => product.id === Number(productId));  
    //const singleProduct = products.find((product) => product.id === pId);  
    if(!singleProduct){
        return res.status(404).send('Product doesnot exists')
    }
    res.json(singleProduct);
})


app.get('/api/v1/query',(req, res) => {

    console.log(req.query)
    //console.log(req.params)
    
    const {search, limit} = req.query;
    console.log(`search=${search} , limit=${limit}`)

    let sortedProducts = [...products]

    if(search){
        sortedProducts = sortedProducts.filter((product) => {
             return product.name.startsWith(search)
        })
    }
    
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if(sortedProducts.length < 1){
        return res.status(200).json({success : true, data:[]})
    }

    res.status(200).json(sortedProducts)
})


/*
app.get('/api/v1/query', (req, res) => {
    // console.log(req.query)
    const { search, limit } = req.query
    let sortedProducts = [...products]
  
    if (search) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.name.startsWith(search)
      })
    }
    if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
      // res.status(200).send('no products matched your search');
      return res.status(200).json({ sucess: true, data: [] })
    }
    res.status(200).json(sortedProducts)
  })
*/
app.all('*',(req,res) =>{
    res.status(404).send('<h1> Resource not found </h1>')
})

app.listen(8000,() => {
    console.log('server is listening at 8000')
})

