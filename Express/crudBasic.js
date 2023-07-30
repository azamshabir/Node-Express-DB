const { application } = require('express');
const express = require('express');
const app = express();

let {people} = require('./data')

app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({success:true, data:people})
})

app.post('/api/people', (req, res) => {
    //console.log(req.body)
    const {name} = req.body;
    console.log(name)

    if(!name){
        return res.status(400).json({success:false, msg: 'please provide valid name'})
    }
    res.status(201).json({success:true, data: [...people, name]})
})

app.all('*',(req,res) =>{
    res.status(404).send('<h1> Resource not found </h1>')
})

app.listen(8000,() => {
    console.log('server is listening at 8000')
})

