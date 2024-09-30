import classNames from 'classnames/bind';
import styles from './ModalSave.module.scss';
import ModalLast from '~/components/ModalLast';
import Button from '~/components/Button';
import * as updateCurrentService from '~/services/AuthService';
import { useContext, useState } from 'react';
import { ContextProvider } from '~/Context';
const cx = classNames.bind(styles);

const ModalSave = ({ isShowModalProfileSave, setIsShowModalProfileSave, setShow, firstName, lastName, name, bio }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setDataCurrentUser } = useContext(ContextProvider);
    function closeModal() {
        setIsShowModalProfileSave(false);
    }

    const handleClickCancel = () => {
        setShow(true);
        setIsShowModalProfileSave(false);
    };

    const handleClickConfirm = async () => {
        await updateCurrentService.updateCurrentUser(
            firstName,
            lastName,
            name,
            bio,
            setIsShowModalProfileSave,
            setIsLoading,
            setDataCurrentUser,
        );
    };
    return (
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
    );
};

export default ModalSave;
