
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log(req.url)
    const {name} = req.body;
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }

    res.status(401).send('please provide Credentials')
})

module.exports = router