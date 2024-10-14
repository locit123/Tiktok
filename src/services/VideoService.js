import { toast } from 'react-toastify';
import axiosInstance from '~/utils/httpRequest';

const getVideoList = async (type, page, setListVideos) => {
    try {
        const res = await axiosInstance.get(`videos?type=${type}&page=${page}`);

        if (res && res.data) {
            setListVideos(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const getAVideo = async (uuid, setDataVideo) => {
    try {
        const res = await axiosInstance.get(`videos/${uuid}`);

        if (res && res.data) {
            setDataVideo(res.data);
        }
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

export { getVideoList, getAVideo, getUsersVideo };
