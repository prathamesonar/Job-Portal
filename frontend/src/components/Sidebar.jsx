import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, Briefcase, User, BarChart, LogOut, Menu, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const navItems = [
  { name: 'Job Posting Form', icon: Briefcase, to: '/dashboard/job-posting-form' },
  { name: 'Job Posted', icon: Briefcase, to: '/dashboard/job-posted' },
  { name: 'Profile', icon: User, to: '/dashboard/profile' },
  { name: 'Customer Analysis', icon: BarChart, to: '/dashboard/analysis' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login'; 
  };

  const NavItem = ({ item }) => (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center p-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`
      }
      onClick={toggleSidebar} 
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span className="truncate">{item.name}</span>
    </NavLink>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            Job Portal
          </h1>
          <button className="p-2 lg:hidden" onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center p-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="truncate">Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;