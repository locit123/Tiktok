const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getSuggestedUsersList = async (setListUsersSuggested) => {
    try {
        const res = await axiosInstance.get(`users/suggested?page=1&per_page=15`);
        if (res && res.data) {
            setListUsersSuggested(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export { getSuggestedUsersList };
