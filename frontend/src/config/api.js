

const API_BASE_URL = isProduction 
  ? `${BACKEND_URL}/api` 
  : 'http://localhost:5000/api'; 

export default API_BASE_URL;
