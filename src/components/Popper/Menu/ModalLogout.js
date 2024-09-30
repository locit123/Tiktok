import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import ModalLast from '~/components/ModalLast';
import { useContext } from 'react';
import { ContextProvider } from '~/Context';
import Button from '~/components/Button';
import { logoutUser } from '~/services/AuthService';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);
const ModalLogout = ({ isOpenLogout, setIsOpenLogout }) => {
    const { handleReload } = useContext(ContextProvider);
    const navigate = useNavigate();

    const handleClickCancel = () => {
        setIsOpenLogout(false);
    };
    const handleClickLogout = async () => {
        await logoutUser();
        setIsOpenLogout(false);
        localStorage.removeItem('tokenLogin');
        navigate('/');
        handleReload();
    };
    return (
        <ModalLast isOpen={isOpenLogout} closeModal={() => setIsOpenLogout(false)}>
            <div className={cx('modal-logout')}>
                <p className={cx('title')}>Are you sure you want to log out?</p>
                <div className={cx('box-bt')}>
                    <Button className={cx('bt', 'bt-cancel')} onClick={handleClickCancel}>
                        Cancel
                    </Button>
                    <Button className={cx('bt', 'btn-out')} outline onClick={handleClickLogout}>
                        Log out
                    </Button>
                </div>
            </div>
        </ModalLast>
    );
};

export default ModalLogout;
