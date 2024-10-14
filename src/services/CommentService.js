const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getListComments = async (id, setListComments, page) => {
    try {
        const res = await axiosInstance.get(`videos/${id}/comments?page=${page}`);
        if (res && res.data && res.meta) {
            setListComments(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const postComment = async (idComment, comment, getApiComment) => {
    try {
        const res = await axiosInstance.post(`videos/${idComment}/comments`, { comment });
        if (res && res.data) {
            getApiComment();
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const deleteComment = async (id, getApiComment, setIsOpen) => {
    try {
        await axiosInstance.delete(`comments/${id}`);
        setIsOpen(false);
        getApiComment();
    } catch (error) {
        toast.error(error.message);
    }
};

export { getListComments, postComment, deleteComment };
