import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from '~/layouts/components/Sidebar/Menu';
import config from '~/config';
import {
    ActiveHomeIcon,
    ExploreIcon,
    ActiveExploreIcon,
    UserGroupIcon,
    ActiveUserGroupIcon,
    LiveIcon,
    ActiveLiveIcon,
    ActiveUserIcon,
    PersonIcon,
    HomeIcon,
    FollowingIcon,
    FollowingActiveIcon,
    MessageIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
import images from '~/assets/images';
import { useContext } from 'react';
import { ContextProvider } from '~/Context';
const cx = classNames.bind(styles);

const Sidebar = () => {
    const token = localStorage.getItem('tokenLogin');
    const { dataCurrentUser, setIsShow } = useContext(ContextProvider);

    const handleClickProfile = () => {
        setIsShow(true);
    };

    const handleLogin = () => {
        setIsShow(true);
    };
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For Your"
                    to={config.routers.home}
                    icon={<HomeIcon />}
                    activeIcon={<ActiveHomeIcon />}
                />
                <MenuItem
                    title="ExploreIcon"
                    to={config.routers.explore}
                    icon={<ExploreIcon />}
                    activeIcon={<ActiveExploreIcon />}
                />

                <MenuItem
                    title="Following"
                    to={config.routers.following}
                    icon={<FollowingActiveIcon className={cx('mr-icon')} />}
                    activeIcon={<FollowingIcon className={cx('mr-icon')} />}
                />
                <MenuItem
                    title="Friends"
                    to={config.routers.friend}
                    icon={<UserGroupIcon />}
                    activeIcon={<ActiveUserGroupIcon />}
                />

                <MenuItem title="LIVE" to={config.routers.live} icon={<LiveIcon />} activeIcon={<ActiveLiveIcon />} />
                <MenuItem
                    title="Messages"
                    to={config.routers.message}
                    icon={<MessageIcon className={cx('mr-icon-two')} />}
                    activeIcon={<MessageIcon className={cx('mr-icon-two')} />}
                />
                {token ? (
                    <MenuItem
                        title="Profile"
                        to={`/@${dataCurrentUser.nickname}`}
                        icon={<ActiveUserIcon />}
                        activeIcon={<ActiveUserIcon />}
                    />
                ) : (
                    <Button
                        sizeIcon
                        className={cx('bt')}
                        leftIcon={<PersonIcon className={cx('icon-bt')} width="3.2rem" height="3.2rem" />}
                        noToken
                        onClick={handleClickProfile}
                    >
                        Profile
                    </Button>
                )}
            </Menu>
            <>
                {token ? (
                    <div className={cx('box-label-footer')}>
                        <span className={cx('label-top')}>Following accounts</span>
                        <span className={cx('label-bottom')}>Accounts you follow will appear here</span>
                    </div>
                ) : (
                    <div className={cx('body-sideBar')}>
                        <p className={cx('label')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button outline large className={cx('login-bt')} onClick={handleLogin}>
                            Log in
                        </Button>
                    </div>
                )}
                <div className={cx('footer-sideBar')}>
                    <div className={cx('btn-coins')}>
                        <img src={images.aTopTop} alt="a" className={cx('img-coins')} />
                        <div className={cx('box-label')}>
                            <div className={cx('label')}>
                                <h4>Create TikTok effects, get a reward</h4>
                            </div>
                        </div>
                    </div>
                    <h4 className={cx('title')}>Company</h4>
                    <h4 className={cx('title')}>Program</h4>
                    <h4 className={cx('title')}>Terms & Policies</h4>
                    <span className={cx('tik-tok')}>© 2024 TikTok</span>
                </div>
            </>
        </aside>
    );
};

export default Sidebar;
