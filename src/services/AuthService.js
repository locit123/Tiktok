import { toast } from 'react-toastify';
import axiosInstance from '~/utils/httpRequest';

const register = async (email, password, setTokenSignup, setLoading, setIsLoading, setTypeModal) => {
    try {
        setLoading(true);
        const body = {
            type: 'email',
            email,
            password,
        };
        const result = await axiosInstance.post(`auth/register`, body);
        if (result && result.data) {
            toast.success('Đăng kí thành công');
            setLoading(false);
            setTokenSignup(result.meta.token);
            setIsLoading(false);
            setTypeModal('');
        }
    } catch (error) {
        setLoading(false);
        toast.error(error.message);
    }
};

const login = async (email, password, setDataLogin, setLoading, setIsShow, navigate, handleReload) => {
    try {
        setLoading(true);
        const data = { email, password };
        const res = await axiosInstance.post(`auth/login`, data);
        if (res && res.data && res.meta) {
            handleReload();
            navigate('/');
            setLoading(false);
            setDataLogin(res);
            setIsShow(false);
            toast.success('Đăng nhập thành công');
        }
    } catch (error) {
        setLoading(false);
        toast.error(error.message);
    }
};

const currentUser = async (setDataCurrentUser) => {
    try {
        const res = await axiosInstance.get(`auth/me`);
        if (res && res.data) {
            setDataCurrentUser(res.data);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const logoutUser = async () => {
    try {
        await axiosInstance.post(`auth/logout`);
    } catch (error) {
        toast.error(error.message);
    }
};

const updateCurrentUser = async (
    firstName,
    lastName,
    name,
    bio,
    setIsShowModalProfileSave,
    setIsLoading,
    setDataCurrentUser,
) => {
    try {
        setIsLoading(true);
        const data = { first_name: firstName, last_name: lastName, nickname: name, bio };
        const res = await axiosInstance.post(`auth/me?_method=PATCH`, data);
        if (res) {
            setIsLoading(false);
            setIsShowModalProfileSave(false);
            currentUser(setDataCurrentUser);
        }
        console.log(res);
    } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
    }
};

export { register, login, currentUser, logoutUser, updateCurrentUser };
