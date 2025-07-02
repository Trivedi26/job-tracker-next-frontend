// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : 'https://abode-next-backend.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
