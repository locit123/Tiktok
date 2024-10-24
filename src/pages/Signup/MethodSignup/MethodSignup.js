import classNames from 'classnames/bind';
import styles from './MethodSignup.module.scss';
import Select from '~/components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { FormSignup } from '~/components/FormLoginAndSignup';
import { ModalBody } from '~/components/Modal';
import { useContext, useEffect, useState } from 'react';
import * as registerService from '~/services/AuthService';
import { ContextProvider } from '~/Context';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import { SIGN_FAILED, SIGN_SUCCESS } from '~/utils/contantValue';
import ModalNotification from '~/components/Notification';

const cx = classNames.bind(styles);

const MethodSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setIsLoading, setTypeModal, setTokenSignup, isOpenModalNotification, setIsOpenModalNotification } =
        useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);

    const handleClickRegister = async () => {
        await registerService.register(email, password, setTokenSignup, setLoading, setIsLoading, setTypeStatus);
    };

    useEffect(() => {
        let time;
        if (typeStatus === SIGN_SUCCESS) {
            setIsOpenModalNotification(true);

            time = setTimeout(() => {
                setTypeModal('');
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        } else if (typeStatus === SIGN_FAILED) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        }
        return () => {
            clearTimeout(time);
        };
    }, [typeStatus, setIsOpenModalNotification, setTypeModal, setTypeStatus]);

    return (
        <div className={cx('wrapper')}>
            <ModalNotification
                modalIsOpen={isOpenModalNotification}
                setIsOpen={setIsOpenModalNotification}
                text={typeStatus === SIGN_SUCCESS ? SIGN_SUCCESS : SIGN_FAILED}
            />
            <div className={cx('header')}>
                <div className={cx('header-title')}>When’s your birthday?</div>
                <div className={cx('header-body')}>
                    <Select label={'Month'} />
                    <Select label={'Day'} />
                    <Select label={'Year'} />
                </div>
                <div className={cx('header-footer')}>Your birthday won't be shown publicly.</div>
            </div>
            <ModalBody titleHeader={'Email'} titleLink={'Sign up with phone'}>
                <FormSignup
                    valueEmail={email}
                    valuePassword={password}
                    onChangeEmail={(e) => setEmail(e.target.value)}
                    onChangePassword={(e) => setPassword(e.target.value)}
                />
            </ModalBody>
            <div className={cx('footer-checkbox')}>
                <label className={cx('box-icon')}>
                    <FontAwesomeIcon icon={faSquareCheck} className={cx('icon')} />
                </label>
                <label className={cx('label')}>
                    Get trending content, newsletters, promotions, recommendations, and account updates sent to your
                    email
                </label>
            </div>
            <div className={cx('footer')}>
                <Button
                    leftIcon={loading && <FontAwesomeIcon icon={faSpinner} className={cx('ic-spinner')} />}
                    large
                    className={cx('btn-footer')}
                    onClick={handleClickRegister}
                    disable={loading ? true : false}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default MethodSignup;
