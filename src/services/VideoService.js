import { toast } from 'react-toastify';
import axiosInstance from '~/utils/httpRequest';

const getVideoList = async (type, page, setListVideos, setTotalPage) => {
    try {
        const res = await axiosInstance.get(`videos?type=${type}&page=${page}`);
        if (res && res.data) {
            setTotalPage(res.meta.pagination.total_pages);
            setListVideos((prev) => {
                if (!prev || prev.length === 0) {
                    return res.data;
                }
                let copyData = [...prev, ...res.data];
                let uniqueListVideo = Array.from(new Set(copyData.map((video) => video.id))).map((idVideo) =>
                    copyData.find((id) => id.id === idVideo),
                );

                return uniqueListVideo;
            });
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { getVideoList };
