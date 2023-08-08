const Upload = require("../models/Jobfiles");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const uploadFiles = async (req, res) => {
  const userId = req.User.userId;
  const jobId = req.params.id;

  if (!jobId) {
    throw new NotFoundError(`No job exists with JobId : ${jobId}`);
  }

  console.log(req.files);

  let jobFiles = req.files.file;

  const filePath = path.join(
    __dirname,
    "../public/uploads/" + `${jobFiles.name}`
  );
  await jobFiles.mv(filePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${jobFiles.name}` } });

  // res.send('Upload Files')
};

module.exports = { uploadFiles };
