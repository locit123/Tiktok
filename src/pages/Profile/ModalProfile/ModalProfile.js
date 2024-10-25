import classNames from 'classnames/bind';
import styles from './ModalProfile.module.scss';
import Modal from 'react-modal';
import { CloseModal, EditIcon } from '~/components/Icons';
import a from '~/assets/images/aFB.jpg';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

Modal.setAppElement('#root');

const ModalProfile = ({
    modalIsOpen,
    setIsOpen,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    name,
    setName,
    bio,
    setBio,
    initState,
    setIsShowModalProfileSave,
}) => {
    const [checkLength, setCheckLength] = useState(false);
    const [isChangeSave, setIsChangeSave] = useState(false);
    const [checkText, setCheckText] = useState(false);

    useEffect(() => {
        if (
            firstName !== initState.firstName ||
            lastName !== initState.lastName ||
            name !== initState.name ||
            bio !== initState.bio
        ) {
            setIsChangeSave(false);
            setCheckText(true);
        } else {
            setIsChangeSave(true);
            setCheckText(false);
        }
    }, [initState.firstName, initState.lastName, firstName, lastName, name, bio, initState.name, initState.bio]);

    function closeModal() {
        setIsOpen(false);
    }

    const handleChangeBio = (e) => {
        if (e.target.value.length > 80) {
            setCheckLength(true);
        } else {
            setCheckLength(false);
        }

        setBio(e.target.value);
    };

    const handleClickSave = async () => {
        setIsOpen(false);
        setIsShowModalProfileSave(true);
    };
    console.log(isChangeSave, 'isChangeSave');

    return (
        <Modal
            className={cx('wrapper')}
            overlayClassName={cx('overlay')}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={false}
        >
            <div className={cx('header')}>
                <h1 className={cx('title')}>Edit profile</h1>
                <div className={cx('close')} onClick={() => setIsOpen(false)}>
                    <CloseModal />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('box-1')}>
                    <div className={cx('label')}>Profile photo</div>
                    <div className={cx('box-img-icon')}>
                        <img src={a} alt="test" className={cx('avatar')} />
                        <div className={cx('icon')}>
                            <EditIcon />
                        </div>
                    </div>
                </div>
                <div className={cx('box-1')}>
                    <div className={cx('label')}>Username</div>
                    <div className={cx('box-right', 'box-height')}>
                        <Input
                            placeholder={'first name'}
                            type={'text'}
                            className={cx('input', 'ip-bottom')}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            placeholder={'last name'}
                            type={'text'}
                            className={cx('input')}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <p className={cx('title-text', 'text')}>www.tiktok.com/@{`${firstName}${lastName}`}</p>
                        <p className={cx('title-text', 'text2')}>
                            Usernames can only contain letters, numbers, underscores, and periods. Changing your
                            username will also change your profile link.
                        </p>
                    </div>
                </div>
                <div className={cx('box-1')}>
                    <div className={cx('label')}>Name</div>
                    <div className={cx('box-right')}>
                        <Input
                            type={'text'}
                            placeholder={'nickname'}
                            className={cx('input')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className={cx('title-text', 'text2')}>
                            Your nickname can only be changed once every 7 days.
                        </p>
                    </div>
                </div>
                <div className={cx('box-1', 'box-2')}>
                    <div className={cx('label')}>Bio</div>
                    <div className={cx('box-right', 'box-area')}>
                        <textarea
                            className={cx('text-area', { checkLength })}
                            placeholder="Bio"
                            value={bio}
                            onChange={handleChangeBio}
                        ></textarea>
                        <span className={cx('length-text')}>{bio.length}/80</span>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('box-bt')}>
                    <Button className={cx('bt', 'bt-hover')} onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        className={cx('bt', 'bt-save', { checkText })}
                        disable={isChangeSave}
                        onClick={handleClickSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalProfile;
