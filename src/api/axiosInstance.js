import axios from 'axios';
const baseUrl = `https://tiktok.fullstack.edu.vn/api/`;

// Tạo một Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để thêm token cho mỗi request
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => {
        if ((err.response && err.response.status === 401) || err.response.status === 403) {
            return err.response.data;
        }

        return Promise.reject(err);
    },
);

export default axiosInstance;
