import axios from 'axios';
const baseUrl = `https://tiktok.fullstack.edu.vn/api/`;

// Tạo một Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

//custom GET
export const Get = async (path, options = {}) => {
    const response = await axiosInstance.get(path, options);
    return response.data;
};

export default axiosInstance;
