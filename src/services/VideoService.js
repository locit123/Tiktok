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

export { getVideoList };
