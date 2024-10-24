import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import ModalLast from '~/components/ModalLast';
import Button from '~/components/Button';
import { logoutUser } from '~/services/AuthService';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { ContextProvider } from '~/Context';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import { LOGOUT } from '~/utils/contantValue';
import ModalNotification from '~/components/Notification';
const cx = classNames.bind(styles);
const ModalLogout = ({ isOpenLogout, setIsOpenLogout }) => {
    const { setToken, setIsOpenModalNotification, isOpenModalNotification } = useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);

    const navigate = useNavigate();

    const handleClickCancel = () => {
        setIsOpenLogout(false);
    };
    const handleClickLogout = async () => {
        await logoutUser();
        setTypeStatus(LOGOUT);
    };

    useEffect(() => {
        let time;
        if (typeStatus === LOGOUT) {
            console.log('LOGOUT');
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsOpenLogout(false);
                navigate('/');
                localStorage.removeItem('tokenLogin');
                setToken(null);
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1500);
        }

        return () => {
            clearTimeout(time);
        };
    }, [typeStatus, setIsOpenModalNotification, setTypeStatus, navigate, setIsOpenLogout, setToken]);
    return (
        <>
            {typeStatus === LOGOUT && (
                <ModalNotification
                    modalIsOpen={isOpenModalNotification}
                    setIsOpen={setIsOpenModalNotification}
                    text={LOGOUT}
                />
            )}
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
        </>
    );
};

export default ModalLogout;
