const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getSuggestedUsersList = async (page, setListUsersSuggested, setLoading) => {
    try {
        setLoading(true);
        const res = await axiosInstance.get(`users/suggested?page=${page}&per_page=10`);
        if (res && res.data) {
            setLoading(false);
            setListUsersSuggested(res.data);
        }
    } catch (error) {
        setLoading(false);
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
