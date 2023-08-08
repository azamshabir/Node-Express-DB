const Job = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, Forbidden } = require("../errors");
const { generatePdf } = require('../pdfkit')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.User.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, records: jobs.length });
};

const getJob = async (req, res) => {
  console.log("Inside get Job : " + req.params.id);
  console.log("Inside get user : " + req.User.userId);
  const userId = req.User.userId;
  const jobId = req.params.id;

  //const {user: {userId} , params: {id: jobId} } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  console.log(`${job}`);

  /* const {user: {userId} , params: {id: jobId} } = req
    const job = await Job.findOne({_id: jobId,  createdBy: userId },)
    */

  if (!job) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.User.userId;
  console.log("Created By : " + req.body.createdBy);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
  //res.json(req.body)
};

const updateJob = async (req, res) => {
  // const {id: jobId} = req.params;

  const userId = req.User.userId;
  const jobId = req.params.id;

  const company = req.body.company;
  const position = req.body.position;

  console.log(`Company => ${company} Position => ${position}`);

  console.log("job Id : " + jobId + " body : " + req.body);

  if (company === "" || position === "") {
    throw new BadRequestError("Mandatory fields : { Company , Postion }");
  }

  if (!jobId) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  //handle user cannot update status

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ job });
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
};

const deleteJob = async (req, res) => {
  const userId = req.User.userId;
  const jobId = req.params.id;

  if (!jobId) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

  const jobExists = await Job.findOne({ _id: jobId, createdBy: userId });
  console.log(`job : ${jobId} exists = ${jobExists}`);

  if (jobExists) {
    throw new Error(`${jobId} Not Deleted...`);
  }

  res.status(StatusCodes.OK).send(`job : ${jobId} deleted successfully..`);
};

const uploadJob = async (req, res) => {
  const userId = req.User.userId;
  const jobId = req.params.id;

  if (!jobId) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  const bLen = Object.keys(req.body).length;
  console.log(`Total Fields in body ${bLen}`);

  if (bLen > 0) {
    throw new BadRequestError("Request Body NOT required for this Resource.");
  }

  const jobDetails = await Job.findOne({ _id: jobId });
  console.log(
    `Current Job Status for jobId : ${jobId} is { ${jobDetails.status} }`
  );

  if (
    jobDetails.status === "Approved" ||
    jobDetails.status === "Reject" ||
    jobDetails.status === "Submitted"
  ) {
    throw new Forbidden(
      `${jobId} Status = ${jobDetails.status}. Can only upload jobs with Status { Pending , Assign Back }`
    );
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId },
    { $set: { status: "Submitted" } },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ job });

  // Send Email to SEVIS
};

const downloadJob = async (req, res) => {

  const userId = req.User.userId;
  const jobId = req.params.id;

  if (!jobId) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  const bLen = Object.keys(req.body).length;
  console.log(`Total Fields in body ${bLen}`);

  if (bLen > 0) {
    throw new BadRequestError("Request Body NOT required for this Resource.");
  }
    
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  console.log(`${job}`);

  if (!job._id) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  if ( job.status === "Pending" || job.status === "Submitted" ) {
    throw new Forbidden(`${jobId} Status = ${jobDetails.status}. Cannot download jobs with Status { Pending , Submitted }`);
  }

  generatePdf(job);
  res.status(StatusCodes.OK).json({ msg: ` Form downloaded for job ${jobId}` });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  uploadJob,
  downloadJob,
};

//https://www.youtube.com/watch?v=jI4K7L-LI58
