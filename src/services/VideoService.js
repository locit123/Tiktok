import axios from 'axios';
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

const fetchLink = async (link, type, setListDataVideoNext, setLink) => {
    try {
        const res = await axios.get(`${link}&type=${type}`);
        if (res && res.data) {
            setListDataVideoNext(res.data.data);
            setLink(res.data.meta.pagination.links.next);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { getVideoList, fetchLink };
