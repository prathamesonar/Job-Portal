

const isProduction = import.meta.env.PROD;

const API_BASE_URL = isProduction 
  ? 'https://jobc-8hsk.onrender.com/api' // Production URL 
  : 'http://localhost:5000/api';  // Local Development URL

export default API_BASE_URL;
