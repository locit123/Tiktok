import { toast } from 'react-toastify';
import axiosInstance from '~/utils/httpRequest';

const getVideoList = async (type, page, setListVideos, setLinkPage) => {
    try {
        const res = await axiosInstance.get(`videos?type=${type}&page=${page}`);
        if (res && res.data) {
            setListVideos(res.data);
            setLinkPage(res.meta.pagination.links.next);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { getVideoList };
