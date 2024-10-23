const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getSuggestedUsersList = async (page) => {
    try {
        const res = await axiosInstance.get(`users/suggested?page=${page}&per_page=10`);
        return res;
    } catch (error) {
        toast.error(error.message);
    }
};

const getAnUser = async (nickname, setListDataAnUser) => {
    try {
        const res = await axiosInstance.get(`users${nickname}`);

        if (res && res.data) {
            setListDataAnUser(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { getSuggestedUsersList, getAnUser };
