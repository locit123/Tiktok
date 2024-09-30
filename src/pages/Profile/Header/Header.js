import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';

import a from '~/assets/images/aFB.jpg';
import EditProfile from './EditProfile';
import MenuShare from './MenuShare';
import ModalProfile from '../ModalProfile';
import { useContext, useState } from 'react';
import { ContextProvider } from '~/Context';
import ModalSave from '../ModalSave';

const cx = classNames.bind(styles);

const Header = () => {
    const { dataCurrentUser } = useContext(ContextProvider);
    const initState = {
        firstName: dataCurrentUser.first_name,
        lastName: dataCurrentUser.last_name,
        name: dataCurrentUser.nickname,
        bio: dataCurrentUser.bio,
    };

    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [isShowModalProfileSave, setIsShowModalProfileSave] = useState(false);

    let css = true;

    const handleClickModal = () => {
        setShow(true);
        setFirstName(dataCurrentUser.first_name);
        setLastName(dataCurrentUser.last_name);
        setName(dataCurrentUser.nickname);
        setBio(dataCurrentUser.bio);
    };
    return (
        <div className={cx('wrapper')}>
            <ModalProfile
                modalIsOpen={show}
                setIsOpen={setShow}
                bio={bio}
                setBio={setBio}
                name={name}
                setName={setName}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                initState={initState}
                setIsShowModalProfileSave={setIsShowModalProfileSave}
            />
            <ModalSave
                isShowModalProfileSave={isShowModalProfileSave}
                setIsShowModalProfileSave={setIsShowModalProfileSave}
                setShow={setShow}
                modalIsOpen={show}
                setIsOpen={setShow}
                bio={bio}
                name={name}
                firstName={firstName}
                lastName={lastName}
            />
            <div className={cx('wrapper-header')}>
                <div className={cx('header')}>
                    <Image src={a} alt="test" className={cx('avatar')} />
                    <div className={cx('footer')}>
                        <div>
                            <h1
                                className={cx('nickname')}
                            >{`${dataCurrentUser.first_name}${dataCurrentUser.last_name}`}</h1>
                            <h2 className={cx('label')}>{dataCurrentUser.nickname}</h2>
                        </div>
                        <div className={cx('edit-profile')}>
                            <EditProfile onClick={handleClickModal} />
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>{dataCurrentUser.followings_count || 0}</strong>
                        <span className={cx('label-body', { css })}>Following</span>
                    </div>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>{dataCurrentUser.followers_count || 0}</strong>
                        <span className={cx('label-body', { css })}>Followers</span>
                    </div>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>{dataCurrentUser.likes_count}</strong>
                        <span className={cx('label-body')}>Likes</span>
                    </div>
                </div>
                <h2 className={cx('footer-title')}>{dataCurrentUser.bio}</h2>
            </div>
            <div className={cx('wrapper-footer')}>
                <MenuShare />
            </div>
        </div>
    );
};

export default Header;
