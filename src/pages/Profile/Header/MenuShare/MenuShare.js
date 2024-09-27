import classNames from 'classnames/bind';
import styles from './MenuShare.module.scss';
import Tippy from '@tippyjs/react/headless';
import ShareIcon, { EmailIcon, LineIcon, LinkedIcon, RedditIcon, TelegramIcon } from '~/components/Icons/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { ArrowIcon, FacebookIcon, ShareLinkIcon, TwIcon, WhatsAppIcon } from '~/components/Icons';
import { useState } from 'react';
const cx = classNames.bind(styles);

const DATA_BUTTON = [
    { icon: <FontAwesomeIcon icon={faShareNodes} style={{ width: '26px', height: '26px' }} />, title: 'Embed' },
    { icon: <FacebookIcon width="2.6rem" height="2.6rem" />, title: 'Share to Facebook' },
    { icon: <WhatsAppIcon />, title: 'Share to WhatsApp' },
    { icon: <TwIcon width="2.6rem" height="2.6rem" />, title: 'Share to Twitter' },
    { icon: <ShareLinkIcon />, title: 'Copy link' },
    { icon: <ArrowIcon />, title: null, style: true, click: false, hide: false },
];

const DATA_BUTTON_MORE = [
    { icon: <LinkedIcon icon={faShareNodes} />, title: 'Linkedln' },
    { icon: <RedditIcon />, title: 'Share to Reddit' },
    { icon: <TelegramIcon />, title: 'Share to Telegram' },
    { icon: <EmailIcon />, title: 'Share to Email' },
    { icon: <LineIcon width="2.6rem" height="2.6rem" />, title: 'Share to Line' },
    { icon: <EmailIcon />, title: 'Share to Pinterest' },
];

const MenuShare = () => {
    const [listHistory, setListHistory] = useState(DATA_BUTTON);

    const renderMenu = (attrs) => (
        <div className="box" tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <Menu
                    DATA_BUTTON={DATA_BUTTON}
                    DATA_BUTTON_MORE={DATA_BUTTON_MORE}
                    listHistory={listHistory}
                    setListHistory={setListHistory}
                />
            </PopperWrapper>
        </div>
    );
    return (
        <div className={cx('wrapper')}>
            <Tippy
                onHide={() => setListHistory(DATA_BUTTON)}
                render={renderMenu}
                delay={[0, 500]}
                interactive
                placement="bottom"
            >
                <ShareIcon />
            </Tippy>
        </div>
    );
};

export default MenuShare;
