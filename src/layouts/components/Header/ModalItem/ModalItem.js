import React, { useContext } from 'react';
import { ContextProvider } from '~/Context';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import MethodSignup from '~/pages/Signup/MethodSignup';
import { SIGN_UP } from '~/utils/contantValue';

const ModalItem = ({ isLoading }) => {
    const { typeModal } = useContext(ContextProvider);

    return <>{typeModal === SIGN_UP ? <MethodSignup /> : isLoading ? <Signup /> : <Login />}</>;
};

export default ModalItem;
