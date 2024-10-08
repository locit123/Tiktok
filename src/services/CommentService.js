const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getListComments = async (id, setListComments, page, setTotalPage, setIsLoading) => {
    try {
        setIsLoading(true);
        const res = await axiosInstance.get(`videos/${id}/comments?page=${page}`);
        if (res && res.data && res.meta) {
            setIsLoading(false);
            setTotalPage(res.meta.pagination.total);

            setListComments((prev) => {
                if (!prev || prev.length === 0) {
                    return res.data;
                }
                let dataCopy = [...prev, ...res.data];
                let uniqueList = Array.from(new Set(dataCopy.map((comment) => comment.id))).map((id) =>
                    dataCopy.find((idComment) => idComment.id === id),
                );

                return uniqueList;
            });
        }
    } catch (error) {
        setIsLoading(false);

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
