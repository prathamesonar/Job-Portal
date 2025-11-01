import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`${theme} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<div className="text-center pt-20 text-xl dark:text-white">404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;