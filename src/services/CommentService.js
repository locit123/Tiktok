const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getListComments = async (id, page) => {
    try {
        const res = await axiosInstance.get(`videos/${id}/comments?page=${page}`);
        return res;
    } catch (error) {
        toast.error(error.message);
    }
};

const postComment = async (idVideo, comment) => {
    try {
        const res = await axiosInstance.post(`videos/${idVideo}/comments`, { comment });

        return res;
    } catch (error) {
        toast.error(error.message);
    }
};

const deleteComment = async (id) => {
    try {
        await axiosInstance.delete(`comments/${id}`);
    } catch (error) {
        toast.error(error.message);
    }
};

export { getListComments, postComment, deleteComment };
