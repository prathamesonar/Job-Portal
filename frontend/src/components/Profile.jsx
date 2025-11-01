import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Key, Save, Edit, AlertTriangle } from 'lucide-react';

const Profile = () => {
  const initialUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = initialUserInfo?.token;

  const [name, setName] = useState(initialUserInfo?.name || '');
  const [email, setEmail] = useState(initialUserInfo?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const API_URL = 'http://localhost:5000/api/users/profile';

  const submitDetailsHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!token) {
        setError('Authentication missing. Please log in.');
        return;
    }
    
    if (name === initialUserInfo.name && email === initialUserInfo.email) {
        setMessage('No changes detected.');
        setIsEditingDetails(false);
        return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        API_URL,
        { name, email },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setMessage('Profile details updated successfully!');
      setIsEditingDetails(false);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update details.');
    }
  };

  const submitPasswordHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        API_URL,
        { password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setMessage('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
        My Profile Settings
      </h2>

      {(message || error) && (
        <div className={`p-3 text-sm rounded-md ${message ? 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300' : 'text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300'}`}>
          {message || error}
        </div>
      )}

      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                <User className="w-5 h-5 mr-2" /> Personal Details
            </h3>
            <button 
                onClick={() => setIsEditingDetails(!isEditingDetails)}
                className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 flex items-center transition-colors"
            >
                <Edit className="w-4 h-4 mr-1" /> {isEditingDetails ? 'Cancel' : 'Edit'}
            </button>
        </div>

        <form onSubmit={submitDetailsHandler} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditingDetails}
                    required
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${!isEditingDetails ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditingDetails}
                    required
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${!isEditingDetails ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                />
            </div>

            {isEditingDetails && (
                <button
                    type="submit"
                    className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    <Save className="w-4 h-4 mr-2" /> Save Details
                </button>
            )}
        </form>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                <Key className="w-5 h-5 mr-2" /> Change Password
            </h3>
            <button 
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 flex items-center transition-colors"
            >
                <Edit className="w-4 h-4 mr-1" /> {isChangingPassword ? 'Cancel' : 'Change'}
            </button>
        </div>

        {isChangingPassword && (
            <form onSubmit={submitPasswordHandler} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                    <Save className="w-4 h-4 mr-2" /> Update Password
                </button>
            </form>
        )}
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-lg text-sm text-yellow-800 dark:text-yellow-300 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2" />
        Note: When updating details, you may need to **re-login** if your session token expires.
      </div>
    </div>
  );
};

export default Profile;