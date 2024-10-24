import React, { useEffect, useState } from 'react';
import { ContextProvider } from './Provider';

const Context = ({ children }) => {
    const [isShow, setIsShow] = useState(false);
    const [typeModal, setTypeModal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckCss, setIsCheckCss] = useState(false);
    const [tokenSignup, setTokenSignup] = useState('');
    const [dataLogin, setDataLogin] = useState([]);
    const [dataCurrentUser, setDataCurrentUser] = useState({});
    const [listFollow, setListFollow] = useState([]);
    const [isTurnVideo, setIsTurnVideo] = useState(false);
    const [isOpenModalNotification, setIsOpenModalNotification] = useState(false);
    const [token, setToken] = useState(() => {
        const newToken = localStorage.getItem('tokenLogin');
        return newToken || null;
    });
    useEffect(() => {
        if (dataLogin && dataLogin.meta && dataLogin.meta.token) {
            localStorage.setItem('tokenLogin', dataLogin.meta.token);
            setToken(dataLogin.meta.token);
        }
    }, [dataLogin]);

    const values = {
        typeModal,
        setTypeModal,
        isCheckCss,
        setIsCheckCss,
        isLoading,
        setIsLoading,
        tokenSignup,
        setTokenSignup,
        dataLogin,
        setDataLogin,
        isShow,
        setIsShow,
        dataCurrentUser,
        setDataCurrentUser,
        listFollow,
        setListFollow,
        isTurnVideo,
        setIsTurnVideo,
        isOpenModalNotification,
        setIsOpenModalNotification,
        token,
        setToken,
    };

    return <ContextProvider.Provider value={values}>{children}</ContextProvider.Provider>;
};

export default Context;
