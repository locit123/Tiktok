import * as request from '~/utils/request';

export const search = async (q, type = 'less') => {
    try {
        const res = await request.Get(`users/search`, {
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
