const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    companyName: { type: String, required: true },
    lastDateForApplication: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;