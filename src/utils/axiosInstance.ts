import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/api/job-tracker'
      : 'https://abode-next-backend.onrender.com/api/job-tracker',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // <== Add this line to send cookies/auth info
});

// ✅ Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
