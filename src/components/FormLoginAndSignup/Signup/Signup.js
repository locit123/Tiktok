import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import Input from '~/components/Input';
import { useState } from 'react';

const cx = classNames.bind(styles);
const Signup = ({ valueEmail, valuePassword, onChangeEmail, onChangePassword }) => {
    const [checkEye, setCheckEye] = useState(false);
    console.log(checkEye, 'check');

    const handleClickIcon = () => {
        setCheckEye(!checkEye);
    };
    return (
        <div className={cx('wrapper')}>
            <Input type={'email'} placeholder={'Email address'} value={valueEmail} onChange={onChangeEmail} />
            <Input
                handleClickIcon={handleClickIcon}
                checkEye={checkEye}
                type={'password'}
                icon
                placeholder={'Password'}
                value={valuePassword}
                onChange={onChangePassword}
            />
            <Input sendCode placeholder={'Enter 6-digit code'} />
        </div>
    );
};

export default Signup;
