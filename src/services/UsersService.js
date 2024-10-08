const { toast } = require('react-toastify');
const { default: axiosInstance } = require('~/utils/httpRequest');

const getSuggestedUsersList = async (page, setListUsersSuggested, setLoading, setTotalPage) => {
    try {
        setLoading(true);
        const res = await axiosInstance.get(`users/suggested?page=${page}&per_page=10`);
        if (res && res.data) {
            setLoading(false);
            setTotalPage(res.meta.pagination.total_pages);
            setListUsersSuggested((prev) => {
                if (!prev || prev.length === 0) {
                    return res.data;
                }

                const dataCopy = [...prev, ...res.data];
                const uniqueList = Array.from(new Set(dataCopy.map((user) => user.id))).map((id) =>
                    dataCopy.find((user) => user.id === id),
                );
                return uniqueList;
            });
        }
    } catch (error) {
        setLoading(false);
        toast.error(error.message);
    }
};

export { getSuggestedUsersList };
