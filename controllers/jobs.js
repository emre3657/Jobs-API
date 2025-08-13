const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
    .sort("-createdAt")
    .lean();
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with the id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  const { userId } = req.user;

  if (!company?.trim() || !position?.trim()) {
    throw new BadRequestError(
      "Company and position fields cannot be left empty!"
    );
  }

  const job = await Job.create({
    company: company.trim(),
    position: position.trim(),
    createdBy: userId,
  });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!company?.trim() || !position?.trim()) {
    throw new BadRequestError(
      "Company and Position fields cannot be left empty"
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    {
      $set: {
        company: company.trim(),
        position: position.trim(),
      },
    },
    { new: true, runValidators: true, context: "query" }
  );

  if (!job) {
    throw new NotFoundError(`No job with the id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with the id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
