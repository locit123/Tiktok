const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getFollowList = async (page, setListFollow) => {
    try {
        const res = await axiosInstance.post(`me/followings?page=${page}`);
        if (res) {
            setListFollow(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const FollowAUser = async (id) => {
    try {
        await axiosInstance.post(`users/${id}/follow`);
    } catch (error) {
        toast.error(error.message);
    }
};

const UnFollow = async (id) => {
    try {
        await axiosInstance.post(`users/${id}/unfollow`);
    } catch (error) {
        toast.error(error.message);
    }
};

export { FollowAUser, UnFollow, getFollowList };
