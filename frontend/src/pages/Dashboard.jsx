import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

// Dashboard Views
import JobPostingForm from '../components/JobPostingForm';
import JobPosted from '../components/JobPosted';
import Profile from '../components/Profile';
import CustomerAnalysis from '../components/CustomerAnalysis';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:ml-64 overflow-y-auto">
        {/* Header/Navbar */}
        <header className="sticky top-0 z-10 p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              className="p-2 mr-4 text-gray-600 dark:text-gray-300 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hidden sm:block">
              Dashboard
            </h2>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="job-posting-form" element={<JobPostingForm />} />
            <Route path="job-posted" element={<JobPosted />} />
            <Route path="profile" element={<Profile />} />
            <Route path="analysis" element={<CustomerAnalysis />} />
            {/* Default redirect for /dashboard */}
            <Route path="/" element={<JobPostingForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;