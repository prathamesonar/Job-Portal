

const isProduction = import.meta.env.PROD;

const API_BASE_URL = isProduction 
  ? 'YOUR_RENDER_BACKEND_URL/api' // Production URL 
  : 'http://localhost:5000/api';  // Local Development URL

export default API_BASE_URL;