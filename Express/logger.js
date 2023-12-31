// const express = require('express');
// const app = express();

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(`Method : ${method} , Url : ${url} , Year : ${time}`);
    next();
}

module.exports=logger