// Central API configuration
// In development, uses localhost. In production, uses the deployed backend URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
