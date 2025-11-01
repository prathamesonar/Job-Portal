import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    lastDateForApplication: '',
    companyName: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!token) {
        setError('You are not logged in.');
        return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:5000/api/jobs', formData, config);
      
      setMessage('Job posted successfully! Redirecting...');
      setFormData({
        jobTitle: '',
        jobDescription: '',
        lastDateForApplication: '',
        companyName: '',
      });
      
      setTimeout(() => navigate('/dashboard/job-posted'), 1500); 

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
        Post a New Job
      </h2>
      
      {message && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-300">{message}</div>}
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows="5"
            value={formData.jobDescription}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>

        <div>
          <label htmlFor="lastDateForApplication" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Date for Application
          </label>
          <input
            type="date"
            id="lastDateForApplication"
            name="lastDateForApplication"
            value={formData.lastDateForApplication}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;