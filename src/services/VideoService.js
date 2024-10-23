import { toast } from 'react-toastify';
import axiosInstance from '~/utils/httpRequest';

const getVideoList = async (type, page) => {
    try {
        const res = await axiosInstance.get(`videos?type=${type}&page=${page}`);
        return res;
    } catch (error) {
        toast.error(error.message);
    }
};

const getAVideo = async (uuid) => {
    try {
        const res = await axiosInstance.get(`videos/${uuid}`);
        return res;
    } catch (error) {
        toast.error(error.message);
    }
};

const getUsersVideo = async (id, setListVideosUser) => {
    try {
        const res = await axiosInstance.get(`users/${id}/videos`);
        if (res && res.data) {
            setListVideosUser(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const postAVideo = async (data) => {
    try {
        const res = await axiosInstance.post(`videos`, data);
        console.log(res, 'ressssssss');
    } catch (error) {
        toast.error(error.message);
    }
};
export { getVideoList, getAVideo, getUsersVideo, postAVideo };
