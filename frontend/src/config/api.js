// File: frontend/src/config/api.js - REVISED

const isProduction = import.meta.env.PROD;

// Read from environment variable (Vercel needs this set)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

const API_BASE_URL = isProduction 
  ? `${BACKEND_URL}/api` // This will use the value set in Vercel during build
  : 'http://localhost:5000/api';  // Local Development URL

export default API_BASE_URL;
