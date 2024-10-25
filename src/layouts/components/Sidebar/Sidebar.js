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
import { useContext, useEffect, useMemo, useState } from 'react';
import { ContextProvider } from '~/Context';
import * as VideoService from '~/services/VideoService';
import AccountItem from '~/components/SuggestedAccounts/AccountItem';
import { useNavigate } from 'react-router';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import { CLICK_PAGE } from '~/utils/contantValue';
import SuggestedAccounts from '~/components/SuggestedAccounts';
const cx = classNames.bind(styles);

const Sidebar = () => {
    const { typePage, setTypePage } = useContext(TypeContextProvider);
    const { dataCurrentUser, setIsShow, setTypeModal, token } = useContext(ContextProvider);
    const [dataListUsersFollowing, setDataListUsersFollowing] = useState([]);
    const [dataListUsers, setDataListUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApiUsers = async () => {
            if (token) {
                try {
                    const result = await VideoService.getVideoList('following', 1);
                    if (result && result.data) {
                        setDataListUsersFollowing(result.data);
                    }
                } catch (error) {
                    console.log('failed api users', error);
                }
            } else {
                setDataListUsersFollowing([]);
            }
        };
        fetchApiUsers();
    }, [token, typePage]);
    console.log(dataListUsersFollowing, 'dataListUsersFollowing');

    useEffect(() => {
        const findUser = () => {
            if (dataListUsersFollowing && dataListUsersFollowing.length > 0) {
                let newData = [];
                for (let i = 0; i < dataListUsersFollowing.length; i++) {
                    if (dataListUsersFollowing[i].user) {
                        newData.push(dataListUsersFollowing[i].user);
                    }
                }
                if (newData && newData.length > 0) {
                    let uniques = newData.filter((user, index, self) => {
                        return index === self.findIndex((u) => u.id === user.id);
                    });
                    setDataListUsers(uniques.slice(0, 5));
                }
            }
        };

        findUser();
    }, [dataListUsersFollowing]);

    const dataStore = useMemo(() => {
        return dataListUsers && dataListUsers.length > 0 ? dataListUsers.map((user) => ({ ...user })) : [];
    }, [dataListUsers]);

    const handleClickProfile = () => {
        setIsShow(true);
        setTypeModal('');
        setTypePage(CLICK_PAGE);
    };

    const handleLogin = () => {
        setIsShow(true);
        setTypeModal('');
    };

    const handleClickItem = (nickname) => {
        navigate(`/@${nickname}`);
    };

    const handleClickNavLink = () => {
        setTypePage(CLICK_PAGE);
    };

    useEffect(() => {
        let time;
        if (typePage === CLICK_PAGE) {
            time = setTimeout(() => {
                setTypePage(null);
            }, 100);
        }
        return () => {
            clearTimeout(time);
        };
    }, [setTypePage, typePage]);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For Your"
                    to={config.routers.home}
                    icon={<HomeIcon />}
                    activeIcon={<ActiveHomeIcon />}
                    handleClickNavLink={handleClickNavLink}
                />
                <MenuItem
                    title="ExploreIcon"
                    to={config.routers.explore}
                    icon={<ExploreIcon />}
                    activeIcon={<ActiveExploreIcon />}
                    handleClickNavLink={handleClickNavLink}
                />

                <MenuItem
                    title="Following"
                    to={config.routers.following}
                    icon={<FollowingActiveIcon className={cx('mr-icon')} />}
                    activeIcon={<FollowingIcon className={cx('mr-icon')} />}
                    handleClickNavLink={handleClickNavLink}
                />
                {token && (
                    <>
                        <MenuItem
                            title="Friends"
                            to={config.routers.friend}
                            icon={<UserGroupIcon />}
                            activeIcon={<ActiveUserGroupIcon />}
                            handleClickNavLink={handleClickNavLink}
                        />

                        <MenuItem
                            title="LIVE"
                            to={config.routers.live}
                            icon={<LiveIcon />}
                            activeIcon={<ActiveLiveIcon />}
                            handleClickNavLink={handleClickNavLink}
                        />
                    </>
                )}

                <MenuItem
                    title="Messages"
                    to={config.routers.message}
                    icon={<MessageIcon className={cx('mr-icon-two')} />}
                    activeIcon={<MessageIcon className={cx('mr-icon-two')} />}
                    handleClickNavLink={handleClickNavLink}
                />
                {token ? (
                    <MenuItem
                        title="Profile"
                        to={`/@${dataCurrentUser.nickname}`}
                        icon={<ActiveUserIcon />}
                        activeIcon={<ActiveUserIcon />}
                        handleClickNavLink={handleClickNavLink}
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
                        {dataStore && dataStore.length > 0 ? (
                            <SuggestedAccounts data={dataStore} />
                        ) : (
                            <span className={cx('label-bottom')}>Accounts you follow will appear here</span>
                        )}
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
