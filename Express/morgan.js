const express = require('express');
const app = express();
const morgan = require('morgan')


// req => Middlewrae => res

app.use(morgan('tiny'))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api', (req, res) => {
    res.send('api..')
})

app.all('*',(req,res) =>{
    res.status(404).send('<h1> Resource not found </h1>')
})

app.listen(8000,() => {
    console.log('server is listening at 8000')
})

