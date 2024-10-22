import React, { useContext } from 'react';
import { PositionSmartPhone } from '~/components/WrapperSmartphone';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import {
    ArrowIcon,
    FavoriteSmartphoneIcon,
    ProfileSmartphoneIcon,
    ReloadIcon,
    TridentHorizontal,
} from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import a from '~/assets/images/aFB.jpg';
import { ContextProvider } from '~/Context';

const cx = classNames.bind(styles);
const Profile = ({ src }) => {
    const { dataCurrentUser } = useContext(ContextProvider);

    return (
        <PositionSmartPhone>
            <div className={cx('wrapper')}>
                <div className={cx('top')}>
                    <div className={cx('box-top')}>
                        <ArrowIcon width="1.9rem" height="1.9rem" className={cx('icon-arrow')} />
                        <div className={cx('box-top-right')}>
                            <FontAwesomeIcon icon={faBell} />
                            <TridentHorizontal width={'1.9rem'} height={'1.9rem'} />
                        </div>
                    </div>
                    <div className={cx('box-profile')}>
                        <div className={cx('profile')}>
                            <div className={cx('box-profile-top')}>
                                <Image src={dataCurrentUser.avatar || a} alt={'a'} className={cx('avatar')} />
                                <span className={cx('text')}>{dataCurrentUser.nickname || 'locfuho'}</span>
                            </div>
                            <div className={cx('box-profile-bottom')}></div>
                            <div className={cx('box-profile-bottom2')}>
                                <div className={cx('box-profile-bottom')}></div>
                                <div className={cx('box-profile-bottom')}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('box-bottom')}>
                        <div className={cx('icon')}>
                            <div className={cx('custom-icon')}>
                                <ProfileSmartphoneIcon width="1.7rem" height="1.7rem" />
                                <FontAwesomeIcon icon={faCaretDown} className={cx('icon-arr')} />
                            </div>
                            <div className={cx('border-bt')}></div>
                        </div>
                        <ReloadIcon width="1.5rem" height="1.5rem" />
                        <FavoriteSmartphoneIcon />
                    </div>
                </div>
                <div className={cx('box-footer')}>
                    {src ? (
                        <div className={cx('box-footer-bottom')}>
                            <video src={src} className={cx('box')} muted />
                        </div>
                    ) : (
                        <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    )}
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2', 'radius')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2')}></div>
                    <div className={cx('box-footer-bottom', 'box-footer-bottom2', 'radius2')}></div>
                </div>
            </div>
        </PositionSmartPhone>
    );
};

export default Profile;
