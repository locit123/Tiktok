import axiosInstance from '~/utils/httpRequest';
import { toast } from 'react-toastify';
import {
    EDIT_PROFILE_FAILED,
    EDIT_PROFILE_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGN_FAILED,
    SIGN_SUCCESS,
} from '~/utils/contantValue';

const register = async (email, password, setTokenSignup, setLoading, setIsLoading, setTypeStatus) => {
    try {
        setLoading(true);
        const body = {
            type: 'email',
            email,
            password,
        };
        const result = await axiosInstance.post(`auth/register`, body);
        if (result && result.data) {
            setTypeStatus(SIGN_SUCCESS);
            setLoading(false);
            setTokenSignup(result.meta.token);
            setIsLoading(false);
        }
    } catch (error) {
        setTypeStatus(SIGN_FAILED);
        setLoading(false);
        toast.error(error.message);
    }
};

const login = async (email, password, setDataLogin, setLoading, setTypeStatus) => {
    try {
        setLoading(true);
        const data = { email, password };
        const res = await axiosInstance.post(`auth/login`, data);
        if (res && res.data && res.meta) {
            setTypeStatus(LOGIN_SUCCESS);
            setLoading(false);
            setDataLogin(res);
        }
    } catch (error) {
        setTypeStatus(LOGIN_FAILED);
        setLoading(false);
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

const updateCurrentUser = async (firstName, lastName, name, bio, setIsLoading, setDataCurrentUser, setTypeStatus) => {
    try {
        setIsLoading(true);
        const data = { first_name: firstName, last_name: lastName, nickname: name, bio };
        const res = await axiosInstance.post(`auth/me?_method=PATCH`, data);
        if (res) {
            setTypeStatus(EDIT_PROFILE_SUCCESS);
            setIsLoading(false);
            currentUser(setDataCurrentUser);
        }
    } catch (error) {
        setTypeStatus(EDIT_PROFILE_FAILED);
        toast.error(error.message);
        setIsLoading(false);
    }
};

export { register, login, currentUser, logoutUser, updateCurrentUser };
