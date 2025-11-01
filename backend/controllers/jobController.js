const Job = require('../models/Job');

const createJob = async (req, res) => {
  const { jobTitle, jobDescription, companyName, lastDateForApplication } = req.body;

  const job = new Job({
    user: req.user._id, 
    jobTitle,
    jobDescription,
    companyName,
    lastDateForApplication,
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
};


const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(jobs);
};


const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to update this job' });
      return;
    }

    job.jobTitle = req.body.jobTitle || job.jobTitle;
    job.jobDescription = req.body.jobDescription || job.jobDescription;
    job.companyName = req.body.companyName || job.companyName;
    job.lastDateForApplication = req.body.lastDateForApplication || job.lastDateForApplication;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};


const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to delete this job' });
      return;
    }

    await job.deleteOne(); 
    res.json({ message: 'Job removed' });
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};

module.exports = { createJob, getMyJobs, updateJob, deleteJob };