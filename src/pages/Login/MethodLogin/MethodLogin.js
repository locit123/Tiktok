import classNames from 'classnames/bind';
import styles from './MethodLogin.module.scss';
import { FormLogin } from '~/components/FormLoginAndSignup';
import { useContext, useEffect, useState } from 'react';
import * as loginService from '~/services/AuthService';
import { ContextProvider } from '~/Context';
import Input from '~/components/Input';
import { useNavigate } from 'react-router';
import ModalNotification from '~/components/Notification';
import { LOGIN_FAILED, LOGIN_SUCCESS } from '~/utils/contantValue';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';

const cx = classNames.bind(styles);

const MethodLogin = () => {
    const { isOpenModalNotification, setIsOpenModalNotification, setDataLogin, setIsShow } =
        useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkEye, setCheckEye] = useState(false);
    const navigate = useNavigate();

    const handleClickLogin = async () => {
        await loginService.login(email, password, setDataLogin, setLoading, setTypeStatus);
    };

    useEffect(() => {
        let time;
        if (typeStatus === LOGIN_SUCCESS) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsShow(false);
                navigate('/');
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1500);
        } else if (typeStatus === LOGIN_FAILED) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1500);
        }

        return () => {
            clearTimeout(time);
        };
    }, [typeStatus, setIsOpenModalNotification, navigate, setIsShow, setTypeStatus]);

    const handleClickIcon = () => {
        setCheckEye(!checkEye);
    };

    return (
        <div className={cx('wrapper')}>
            <ModalNotification
                modalIsOpen={isOpenModalNotification}
                setIsOpen={setIsOpenModalNotification}
                text={typeStatus === LOGIN_SUCCESS ? LOGIN_SUCCESS : LOGIN_FAILED}
            />
            <FormLogin
                titleHeader={'Email or username'}
                titleLink={'Log in with phone'}
                labelLink={'forgot password?'}
                handleClickLogin={handleClickLogin}
                loading={loading}
            >
                <Input
                    className={cx('input')}
                    type={'email'}
                    placeholder={'Email or username'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    className={cx('input')}
                    type={checkEye ? 'text' : 'password'}
                    handleClickIcon={handleClickIcon}
                    placeholder={'Password'}
                    icon
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    checkEye={checkEye}
                />
            </FormLogin>
        </div>
    );
};

export default MethodLogin;
