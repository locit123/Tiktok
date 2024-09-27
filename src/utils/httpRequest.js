import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

// Tạo một Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tokenLogin');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error.response.data),
);

axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => {
        if (err && err.response && err.name === 'AxiosError' && err.response.data) {
            return Promise.reject(err.response.data);
        }
        return Promise.reject(err);
    },
);

export default axiosInstance;
