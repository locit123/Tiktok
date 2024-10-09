import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';

import EditProfile from './EditProfile';
import MenuShare from './MenuShare';
import ModalProfile from '../ModalProfile';
import { useContext, useMemo, useState } from 'react';
import ModalSave from '../ModalSave';

import { ContextProvider } from '~/Context';
import Button from '~/components/Button';
import * as FollowService from '~/services/FollowService';
import { FollowingTickIcon, TridentHorizontal } from '~/components/Icons';

const cx = classNames.bind(styles);

const Header = ({ listDataAnUser, getApiAnUser }) => {
    const { dataCurrentUser } = useContext(ContextProvider);
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [isShowModalProfileSave, setIsShowModalProfileSave] = useState(false);

    const dataStorage = useMemo(() => {
        return { ...listDataAnUser };
    }, [listDataAnUser]);
    console.log(dataStorage, 'dataStorage');

    const initState = {
        firstName: dataStorage.first_name,
        lastName: dataStorage.last_name,
        name: dataStorage.nickname,
        bio: dataStorage.bio,
    };

    let css = true;

    const handleClickModal = () => {
        setShow(true);
        setFirstName(dataStorage.first_name);
        setLastName(dataStorage.last_name);
        setName(dataStorage.nickname);
        setBio(dataStorage.bio);
    };

    const handleClickFollow = async () => {
        let id = dataStorage.id;
        let isFollow = dataStorage.is_followed;
        if (isFollow) {
            await FollowService.UnFollow(id);
        } else {
            await FollowService.FollowAUser(id);
        }
        await getApiAnUser();
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
                    <Image src={dataStorage.avatar} alt="test" className={cx('avatar')} />
                    <div className={cx('footer')}>
                        <div>
                            <h1 className={cx('nickname')}>{`${dataStorage.first_name}${dataStorage.last_name}`}</h1>
                            <h2 className={cx('label')}>{dataStorage.nickname}</h2>
                        </div>
                        <div className={cx('edit-profile')}>
                            {dataCurrentUser.id === dataStorage.id ? (
                                <EditProfile onClick={handleClickModal} />
                            ) : (
                                <div className={cx('user-other')}>
                                    <Button
                                        onClick={handleClickFollow}
                                        className={cx('bt', { isFollow: dataStorage.is_followed })}
                                        primary
                                    >
                                        {dataStorage.is_followed ? (
                                            <div className={cx('box-following')}>
                                                <FollowingTickIcon />
                                                <span>Following</span>
                                            </div>
                                        ) : (
                                            <div>Follow</div>
                                        )}
                                    </Button>
                                    <Button className={cx('bt2')} outline>
                                        Message
                                    </Button>
                                    <div className={cx('ic-trident')}>
                                        <TridentHorizontal />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>{dataStorage.followings_count || 0}</strong>
                        <span className={cx('label-body', { css })}>Following</span>
                    </div>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>{dataStorage.followers_count || 0}</strong>
                        <span className={cx('label-body', { css })}>Followers</span>
                    </div>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>{dataStorage.likes_count}</strong>
                        <span className={cx('label-body')}>Likes</span>
                    </div>
                </div>
                <h2 className={cx('footer-title')}>{dataStorage.bio}</h2>
            </div>
            <div className={cx('wrapper-footer')}>
                <MenuShare />
            </div>
        </div>
    );
};

export default Header;
