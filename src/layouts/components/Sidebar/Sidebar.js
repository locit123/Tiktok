import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from '~/layouts/components/Sidebar/Menu';
import config from '~/config';
import {
    HomeIcon,
    ActiveHomeIcon,
    ExploreIcon,
    ActiveExploreIcon,
    UserGroupIcon,
    ActiveUserGroupIcon,
    LiveIcon,
    ActiveLiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
const cx = classNames.bind(styles);

const Sidebar = () => {
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
                    icon={<UserGroupIcon />}
                    activeIcon={<ActiveUserGroupIcon />}
                />
                <MenuItem title="LIVE" to={config.routers.live} icon={<LiveIcon />} activeIcon={<ActiveLiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested Accounts" />
        </aside>
    );
};

export default Sidebar;
