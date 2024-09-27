import axiosInstance from '~/utils/httpRequest';
export const search = async (q, type = 'less') => {
    try {
        const res = await axiosInstance.get(`users/search`, {
            params: {
                q: q,
                type: type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
