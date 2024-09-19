import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faCircleQuestion,
    faEarthAsia,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
    faMoon,
    faAdd,
} from '@fortawesome/free-solid-svg-icons';

import config from '~/config';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { CheckboxIcon, CheckboxNone, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                { type: 'language', code: 'en', title: 'English' },
                { type: 'language', code: 'vi', title: 'Tiếng Việt' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];
const Header = () => {
    const currentUser = true;

    //handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //logic
                break;
            default:
        }
    };

    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/@hoa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Dark more',
            children2: {
                title: 'Dark more',
                data: [
                    { type: 'darkAndMore', title: 'Auto', icon: <CheckboxIcon /> },
                    { type: 'dark', title: 'Dark more', icon: <CheckboxNone /> },
                    { type: 'light', title: 'Light more', icon: <CheckboxNone /> },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Logout',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routers.home} className={cx('logo')}>
                    <img src={images.logo} alt="tikTok" />
                </Link>
                {/* SEARCH */}
                <Search />
                {/* ACTIONS */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button small to={'/upload'} outlineHeader leftIcon={<FontAwesomeIcon icon={faAdd} />}>
                                Upload
                            </Button>
                            <Tippy content="Inbox" placement="bottom" delay={[0, 200]}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? USER_MENU : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/f441b08992c763eba9ffb372dd193465.jpeg?lk3s=30310797&nonce=74663&refresh_token=e565f8c7eddbc0af305ec7b582716171&x-expires=1726326000&x-signature=xEholOMvkHG3OpEPL4HA%2BD4uzNg%3D&shp=30310797&shcp=-"
                                className={cx('user-avatar')}
                                alt="nguyen van a"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;
