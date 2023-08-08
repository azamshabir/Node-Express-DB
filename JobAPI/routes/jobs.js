const express = require('express')
const router = express.Router()

const { getAllJobs, getJob, createJob, updateJob, deleteJob, uploadJob, downloadJob } = require('../controllers/jobs')

const {uploadFiles} = require('../controllers/uploadFiles')

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)
router.route('/uploadManager/:id').patch(uploadJob)
router.route('/downloadManager/:id').patch(downloadJob)
router.route('/uploads/:id').post(uploadFiles)

module.exports = router