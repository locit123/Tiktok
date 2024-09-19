import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

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
