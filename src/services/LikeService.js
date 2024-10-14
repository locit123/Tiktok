const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const likeAPost = async (idVideo) => {
    try {
        await axiosInstance.post(`videos/${idVideo}/like`);
    } catch (error) {
        toast.error(error.message);
    }
};

const unLikeAPost = async (idVideo) => {
    try {
        await axiosInstance.post(`videos/${idVideo}/unlike`);
    } catch (error) {
        toast.error(error.message);
    }
};

const likeAComment = async (idComment, getApiComment) => {
    try {
        const res = await axiosInstance.post(`comments/${idComment}/like`);
        if (res && res.data) {
            getApiComment();
        }
    } catch (error) {
        toast.error(error.message);
    }
};
const unLikeAComment = async (idComment, getApiComment) => {
    try {
        const res = await axiosInstance.post(`comments/${idComment}/unlike`);
        if (res && res.data) {
            getApiComment();
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { likeAPost, unLikeAPost, likeAComment, unLikeAComment };
