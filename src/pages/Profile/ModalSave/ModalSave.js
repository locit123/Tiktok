import classNames from 'classnames/bind';
import styles from './ModalSave.module.scss';
import ModalLast from '~/components/ModalLast';
import Button from '~/components/Button';
import * as updateCurrentService from '~/services/AuthService';
import { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '~/Context';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import ModalNotification from '~/components/Notification';
import { EDIT_PROFILE_FAILED, EDIT_PROFILE_SUCCESS } from '~/utils/contantValue';
const cx = classNames.bind(styles);

const ModalSave = ({
    isShowModalProfileSave,
    setIsShowModalProfileSave,
    setShow,
    firstName,
    lastName,
    name,
    bio,
    setListDataAnUser,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setDataCurrentUser, isOpenModalNotification, setIsOpenModalNotification, dataCurrentUser } =
        useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);
    function closeModal() {
        setIsShowModalProfileSave(false);
    }

    const handleClickCancel = () => {
        setShow(true);
        setIsShowModalProfileSave(false);
    };
    console.log(typeStatus, isOpenModalNotification, 'check');

    const handleClickConfirm = async () => {
        await updateCurrentService.updateCurrentUser(
            firstName,
            lastName,
            name,
            bio,
            setIsLoading,
            setDataCurrentUser,
            setTypeStatus,
        );
        setListDataAnUser((prevUser) =>
            prevUser.id === dataCurrentUser.id
                ? { ...prevUser, first_name: firstName, last_name: lastName, nickname: name, bio: bio }
                : prevUser,
        );
    };

    useEffect(() => {
        let time;
        if (typeStatus === EDIT_PROFILE_SUCCESS) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsShowModalProfileSave(false);
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        } else if (typeStatus === EDIT_PROFILE_FAILED) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        }

        return () => {
            clearTimeout(time);
        };
    }, [typeStatus, setIsOpenModalNotification, setTypeStatus, setIsShowModalProfileSave]);
    return (
        <>
            {typeStatus === EDIT_PROFILE_SUCCESS || typeStatus === EDIT_PROFILE_FAILED ? (
                <ModalNotification
                    modalIsOpen={isOpenModalNotification}
                    setIsOpen={setIsOpenModalNotification}
                    text={typeStatus === EDIT_PROFILE_SUCCESS ? EDIT_PROFILE_SUCCESS : EDIT_PROFILE_FAILED}
                />
            ) : (
                <></>
            )}
            <ModalLast closeModal={closeModal} isOpen={isShowModalProfileSave}>
                <div className={cx('wrapper')}>
                    <p className={cx('title')}>Set nickname?</p>
                    <p className={cx('label')}>You can only change your nickname once every 7 days</p>
                    <div className={cx('box-bt')}>
                        <Button className={cx('bt', 'bt-cancel')} onClick={handleClickCancel}>
                            Cancel
                        </Button>
                        <Button
                            disable={isLoading ? true : false}
                            className={cx('bt', { isLoading })}
                            primary
                            onClick={handleClickConfirm}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </ModalLast>
        </>
    );
};

export default ModalSave;
