const User = require("../models/User");
const Jobs = require('../models/jobs');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, Forbidden, NotFoundError} = require("../errors");

const getAllJobStatus = async (req, res) => {
    const jobs = await Jobs.find({status: 'Submitted'}).sort('_id')
    res.status(StatusCodes.OK).json({jobs, records: jobs.length})
}

const getJobStatus = async (req, res) => {
    console.log('Inside get Job : '+ req.params.id)
    console.log('Inside get user : '+ req.User.userId)
    const userId = req.User.userId;
    const jobId = req.params.id;
    
    const job = await Jobs.findOne({_id: jobId})
    console.log(`${job}`)

    if(!job){
        throw new NotFoundError(`No job exists with JobId : ${jobId}`)
    }

    if(job.status === 'Pending'){
        throw new Forbidden('Only Acess to Status : { Submitted, Approvered , Reject, Assign Back ');
    }

    res.status(StatusCodes.OK).json({ job })
}

const setJobStatus = async (req, res) => {
     const userId = req.User.userId;
     const jobId = req.params.id;
 
     console.log(req.body)
     const status = req.body.status;
     
     const comments = req.body.ApproverComments;
     const bLen = Object.keys(req.body).length;
     console.log(`Total Fields in body ${bLen}`);
     console.log(`Status => ${status}`)
     console.log(`User Id : ${userId}`)

     const date_time = new Date();
     console.log(date_time);

     if(bLen > 2){
        throw new Forbidden('Only Acess to Field : { Status, ApproverComments }');
     }

     if( bLen < 2 || status === '' || status === null || comments === '' || comments === null ){
        throw new BadRequestError('Mandatory field : { Status , ApproverComments }')
     }
 
     if(!jobId){
         throw new NotFoundError(`No job exists with JobId : ${jobId}`)
     }

    const jobDetails = await Jobs.findOne({_id: jobId})
    console.log(`Current Job Status for jobId : ${jobId} is { ${jobDetails.status} }`)


    if(status === jobDetails.status){
        throw new Error(`Same Status ,  Current Status = ${jobDetails.status} | Status to be updated = ${status}`)
    }

    if(jobDetails.status.toUpperCase() === 'PENDING'){
        throw new Forbidden('Only Access to Status : { Submitted, Approvered , Reject, Assign Back }');
    }
    
    let job = await Jobs.findByIdAndUpdate({ _id:jobId },  req.body , {new: true, runValidators: true})
    job = await Jobs.findByIdAndUpdate({ _id:jobId }, {$set : {"ApprovedBy": userId}} , {new: true, runValidators: true})
    job = await Jobs.findByIdAndUpdate({ _id:jobId }, {$set : {"ApprovedDate": date_time}} , {new: true, runValidators: true})
    res.status(StatusCodes.OK).json({job})

    //Send Email Logic

 }

 
module.exports = { getAllJobStatus, getJobStatus, setJobStatus }