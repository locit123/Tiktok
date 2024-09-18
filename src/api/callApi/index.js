import axiosInstance from '~/api/axiosInstance';

const apiUser = {
    searchAccount: (q, type = 'less') => axiosInstance.get(`users/search?q=${encodeURIComponent(q)}&type=${type}`),
};

export { apiUser };
