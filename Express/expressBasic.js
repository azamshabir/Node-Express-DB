const express = require('express');
const app = express();


// req => Middlewrae => res

const logger =(req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(`Method : ${method} , Url : ${url} , Year : ${time}`);
    next();
}

const authorize = (req, res, next) => {
    const {user} = req.query;

    if(user === 'john'){
        req.user = {name:'john', id:3}
        next();
    }else{
        res.status(401).send('Unauthorized')
    }
}

/*
app.get('/', (req, res) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(`Method : ${method} , Url : ${url} , Year : ${time}`)
    res.send('Home')
})
*/

app.get('/', logger, (req, res) => {
    res.send('Home')
})

app.get('/about', logger,(req, res) => {
    res.send('About')
})

app.get('/api',[logger, authorize],(req, res) => {
    res.send('api..')
})

app.all('*',(req,res) =>{
    res.status(404).send('<h1> Resource not found </h1>')
})

app.listen(8000,() => {
    console.log('server is listening at 8000')
})

