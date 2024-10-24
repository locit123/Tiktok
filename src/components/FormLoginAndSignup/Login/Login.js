import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ModalBody } from '~/components/Modal';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Login = ({ labelLink, handleClickLogin, loading, titleHeader, titleLink, children }) => {
    return (
        <div className={cx('wrapper')}>
            <ModalBody titleHeader={titleHeader} titleLink={titleLink}>
                {children}
            </ModalBody>
            <Link to={'forgot-password'} className={cx('label-link')}>
                {labelLink}
            </Link>
            <Button
                leftIcon={loading ? <FontAwesomeIcon icon={faSpinner} className={cx('icon-spinner')} spin /> : null}
                large
                className={cx('bt-login')}
                onClick={handleClickLogin}
                disable={loading ? true : false}
            >
                Log in
            </Button>
        </div>
    );
};

export default Login;
