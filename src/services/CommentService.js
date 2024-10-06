const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getListComments = async (id, setListComments) => {
    try {
        const res = await axiosInstance.get(`videos/${id}/comments`);
        if (res && res.data && res.meta) {
            setListComments(res);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { getListComments };
