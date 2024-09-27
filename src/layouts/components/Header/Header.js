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
import Modal from '~/components/Modal';
import ModalItem from './ModalItem';
import { ContextProvider } from '~/Context';
import { useCallback, useContext, useEffect } from 'react';
import { LOG_IN, LOG_IN_TO_TIK_TOK, LOGIN, SIGN_UP, SIGN_UP_DEFAULT, SIGN_UP_FOR_TIK_TOK } from '~/utils/contantValue';
import * as currentUserService from '~/services/AuthService';
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
    const { typeModal, setTypeModal, isLoading, setIsLoading, isShow, setIsShow, setDataCurrentUser, dataCurrentUser } =
        useContext(ContextProvider);
    const token = localStorage.getItem('tokenLogin');

    const getCurrentUser = useCallback(async () => {
        if (token) {
            await currentUserService.currentUser(setDataCurrentUser);
        }
    }, [setDataCurrentUser, token]);
    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser, token]);

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
            to: `/@${dataCurrentUser.nickname}`,
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
            separate: true,
        },
    ];

    const handleChange = () => {
        setTypeModal('');
        setIsLoading(false);
    };

    const handleClickLogin = () => {
        setIsShow(true);
        handleChange();
    };

    const handleClickClose = () => {
        setIsShow(false);
        handleChange();
    };

    const handleClickLink = (e) => {
        e.preventDefault();
        setTypeModal('');
        setIsLoading(!isLoading);
    };

    return (
        <header className={cx('wrapper')}>
            <Modal
                isShow={isShow}
                setIsShow={setIsShow}
                handleClickClose={handleClickClose}
                handleClickLink={handleClickLink}
                href={isLoading ? config.routers.login : config.routers.signup}
                titleTikTok={
                    typeModal === SIGN_UP
                        ? SIGN_UP_DEFAULT
                        : typeModal === LOG_IN
                        ? LOGIN
                        : isLoading
                        ? SIGN_UP_FOR_TIK_TOK
                        : LOG_IN_TO_TIK_TOK
                }
                titleFooter={isLoading ? LOGIN : SIGN_UP_DEFAULT}
            >
                <ModalItem />
            </Modal>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routers.home} className={cx('logo')}>
                    <img src={images.logo} alt="tikTok" />
                </Link>
                {/* SEARCH */}
                <Search />
                {/* ACTIONS */}
                <div className={cx('actions')}>
                    {token ? (
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
                            <Button onClick={handleClickLogin} primary>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={token ? USER_MENU : MENU_ITEM} onChange={handleMenuChange}>
                        {token ? (
                            <Image
                                src={dataCurrentUser.avatar}
                                className={cx('user-avatar')}
                                alt={dataCurrentUser.nickname}
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
