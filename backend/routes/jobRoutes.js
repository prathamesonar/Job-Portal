const express = require('express');
const router = express.Router();
const {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createJob); 

router.route('/myjobs')
    .get(protect, getMyJobs); 

router.route('/:id')
    .put(protect, updateJob) 
    .delete(protect, deleteJob); 

module.exports = router;