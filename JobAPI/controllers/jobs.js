const Job = require('../models/jobs')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError , NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.User.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, records: jobs.length})
}

const getJob = async (req, res) => {
    console.log('Inside get Job : '+ req.params.id)
    console.log('Inside get user : '+ req.User.userId)
    const userId = req.User.userId;
    const jobId = req.params.id;
    
    //const {user: {userId} , params: {id: jobId} } = req
    const job = await Job.findOne({_id: jobId,  createdBy: userId },)

   /* const {user: {userId} , params: {id: jobId} } = req
    const job = await Job.findOne({_id: jobId,  createdBy: userId },)
    */

    if(!job){
        throw new NotFoundError(`No job exists with JobId : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}



const createJob = async (req, res) => {
    req.body.createdBy = req.User.userId
    console.log('Created By : '+req.body.createdBy)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
    //res.json(req.body)
    
}

const updateJob = async (req, res) => {
   // const {id: jobId} = req.params;
    
    const userId = req.User.userId;
    const jobId = req.params.id;

    const company = req.body.company;
    const position = req.body.position;

    console.log(`Company => ${company} Position => ${position}`)

    console.log('job Id : '+jobId +" body : "+req.body)

    if(company === '' || position === ''){
        throw new BadRequestError('Mandatory fields : { Company , Postion }')
    }

    if(!jobId){
        throw new NotFoundError(`No job exists with JobId : ${jobId}`)
    }

    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy: userId}, req.body , {new: true, runValidators: true})
    res.status(StatusCodes.OK).json({job})
    //res.send('Get All Jobs')

/*
    const {body: {company, position}, user: {userId}, params: {id:jobId}, } = req

    if(company === '' || position === ''){
        throw new BadRequestError('Mandatory fields : { Company , Postion }')
    }

    if(!job){
        throw new NotFoundError(`No job exists with JobId : ${jobId}`)
    }

    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy: userId}, req.body , {new: true, runValidators: true})
*/
}

const deleteJob = async (req, res) => {

    const userId = req.User.userId;
    const jobId = req.params.id;

    if(!jobId){
        throw new NotFoundError(`No job exists with JobId : ${jobId}`)
    }

    const job = await Job.findByIdAndRemove({_id:jobId, createdBy: userId})

    const jobExists = await Job.findOne({_id: jobId,  createdBy: userId },)
    console.log(`job : ${jobId} exists = ${jobExists}`)
 
     if(jobExists){
         throw new Error(`${jobId} Not Deleted...`)
     }

    res.status(StatusCodes.OK).send(`job : ${jobId} deleted successfully..`)
}


module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }

//https://www.youtube.com/watch?v=jI4K7L-LI58