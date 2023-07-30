const express = require('express');
const app = express();

const people = require('./peopleRouteFinal')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/people', people)

app.all('*',(req,res) =>{
    console.log(req.params)
    console.log(req.url)
    res.status(404).send('<h1> Resource not found </h1>')
})

app.listen(8000,() => {
    console.log('server is listening at 8000')
})


// peopleRouteSampleFinal.js > peopleRouteFinal.js > people.js [ Controller ]