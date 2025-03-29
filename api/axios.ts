// api.js
import axios from 'axios';
import { appConfig } from '@/constants/config';

const api = axios.create({
    baseURL: appConfig.baseUrl,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        // Add any common headers here
    },
});

/*
// Add request interceptor
api.interceptors.request.use(
    (config) => {
        // You can modify the config here (e.g., add auth token)
        const token = 'your-auth-token'; // Get from storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
*/

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error(
                'API Error:',
                error.response.status,
                error.response.data
            );
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Error: No response received');
        } else {
            // Something happened in setting up the request
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
