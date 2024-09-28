import classNames from 'classnames/bind';
import styles from './MethodLogin.module.scss';
import { FormLogin } from '~/components/FormLoginAndSignup';
import { useContext, useState } from 'react';
import * as loginService from '~/services/AuthService';
import { ContextProvider } from '~/Context';
import Input from '~/components/Input';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

const MethodLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [checkEye, setCheckEye] = useState(false);
    const navigate = useNavigate();
    const { setDataLogin, setIsShow, handleReload } = useContext(ContextProvider);

    const handleClickLogin = async () => {
        await loginService.login(email, password, setDataLogin, setLoading, setIsShow, navigate, handleReload);
    };

    const handleClickIcon = () => {
        setCheckEye(!checkEye);
    };

    return (
        <div className={cx('wrapper')}>
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
