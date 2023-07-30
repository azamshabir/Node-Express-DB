const express = require('express');
const app = express();
const path= require('path')


//app.get //app.post //app.put //app.delete
//app.all //app.use //app.listen


//setup static and middleware
app.use(express.static('./public'))

app.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname,'./public/InputForm.html'))
})


app.get('/',(req, res) => {
    res.status(200).send('Home page')
})

app.get('/about',(req,res) => {
    res.status(200).send('About Page')
})

app.all('*',(req,res) =>{
    res.status(404).send('<h1> Resource not found </h1>')
})

app.listen(8000,() => {
    console.log('server is listening at 8000')
})

