import React, { useContext } from 'react';
import { ContextProvider } from '~/Context';
import Login from '~/pages/Login';
import MethodLogin from '~/pages/Login/MethodLogin';
import Signup from '~/pages/Signup';
import MethodSignup from '~/pages/Signup/MethodSignup';
import { LOG_IN, SIGN_UP } from '~/utils/contantValue';

const ModalItem = () => {
    const { typeModal, isLoading } = useContext(ContextProvider);

    return (
        <>
            {typeModal === SIGN_UP ? (
                <MethodSignup />
            ) : typeModal === LOG_IN ? (
                <MethodLogin />
            ) : isLoading ? (
                <Signup />
            ) : (
                <Login />
            )}
        </>
    );
};

export default ModalItem;
