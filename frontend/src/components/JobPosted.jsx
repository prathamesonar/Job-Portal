import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, Save, X } from 'lucide-react';
import { format } from 'date-fns';

const JobPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;
  const API_URL = 'http://localhost:5000/api/jobs/myjobs';

  const fetchJobs = async () => {
    if (!token) {
      setError('Authentication token missing. Please log in again.');
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(API_URL, config);
      setJobs(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, config);
      
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job.');
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    const formattedDate = format(new Date(job.lastDateForApplication), 'yyyy-MM-dd');
    setEditFormData({
        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription,
        companyName: job.companyName,
        lastDateForApplication: formattedDate,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`http://localhost:5000/api/jobs/${id}`, editFormData, config);

      setJobs(jobs.map(job => job._id === id ? data : job));
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job.');
    }
  };

  if (loading) return <div className="text-center text-lg dark:text-white">Loading jobs...</div>;
  if (error) return <div className="p-4 text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-300">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
        My Posted Jobs ({jobs.length})
      </h2>

      <div className="space-y-6">
        {jobs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">You haven't posted any jobs yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-xl"
            >
              {editingId === job._id ? (
                <form className="space-y-4">
                  <input type="text" name="jobTitle" value={editFormData.jobTitle} onChange={handleEditChange} className="text-2xl font-bold w-full bg-gray-50 dark:bg-gray-700 p-2 rounded" required />
                  <input type="text" name="companyName" value={editFormData.companyName} onChange={handleEditChange} className="text-lg font-medium text-indigo-600 dark:text-indigo-400 w-full bg-gray-50 dark:bg-gray-700 p-2 rounded" required />
                  <textarea name="jobDescription" value={editFormData.jobDescription} onChange={handleEditChange} rows="3" className="text-gray-700 dark:text-gray-300 w-full bg-gray-50 dark:bg-gray-700 p-2 rounded" required></textarea>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Date:</label>
                  <input type="date" name="lastDateForApplication" value={editFormData.lastDateForApplication} onChange={handleEditChange} className="w-full bg-gray-50 dark:bg-gray-700 p-2 rounded" required />
                  
                  <div className="flex space-x-3">
                    <button type="button" onClick={() => handleSave(job._id)} className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                      <Save className="w-5 h-5 mr-1" /> Save
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors">
                      <X className="w-5 h-5 mr-1" /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{job.jobTitle}</h3>
                  <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2">{job.companyName}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{job.jobDescription}</p>

                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      <b>Last Date: </b> {' '}
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {format(new Date(job.lastDateForApplication), 'MMM dd, yyyy')}
                      </span>
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
                        title="Edit Job"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPosted;