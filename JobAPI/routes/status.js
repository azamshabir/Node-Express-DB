const express = require('express')
const router = express.Router()

const  { getAllJobStatus, getJobStatus, setJobStatus } =require('../controllers/status')

router.route('/').get(getAllJobStatus)
router.route('/:id').get(getJobStatus).patch(setJobStatus)

module.exports = router