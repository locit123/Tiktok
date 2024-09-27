import classNames from 'classnames/bind';
import styles from './MethodSignup.module.scss';
import Select from '~/components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { FormSignup } from '~/components/FormLoginAndSignup';
import { ModalBody } from '~/components/Modal';
import { useContext, useState } from 'react';
import * as registerService from '~/services/AuthService';
import { ContextProvider } from '~/Context';

const cx = classNames.bind(styles);

const MethodSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setIsLoading, setTypeModal, setTokenSignup } = useContext(ContextProvider);

    const handleClickRegister = async () => {
        await registerService.register(email, password, setTokenSignup, setLoading, setIsLoading, setTypeModal);
    };

    return (
        <div className={cx('wrapper')}>
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
