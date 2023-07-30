const express = require('express')
const app = express()

const auth = require('./authRouter')

app.use('/login', auth)

app.listen(8000,() => {
    console.log('server is listening at 8000')
})