const express = require('express')
const router = express.Router()

const {login, dashboard} = require('../controller/main')

const authenticationMiddleWare = require('../middleware/auth')

router.route('/dashboard').get(authenticationMiddleWare, dashboard)
router.route('/login').post(login)

module.exports = router