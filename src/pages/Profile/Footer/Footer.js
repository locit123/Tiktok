import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { PrivateIcon } from '~/components/Icons';
import { FAV, LAT, LIK, OLD, POP, VID } from '~/utils/contantValue';

const cx = classNames.bind(styles);

const Footer = ({
    typeTab,
    setTypeTab,
    typeButton,
    setTypeButton,
    typeTabHover,
    setTypeTabHover,
    historyTab,
    setHistoryTab,
}) => {
    const handleClickChangeType = (type) => {
        setTypeTab(type);
        setHistoryTab(type);
    };

    const handleMouseEnter = (typeHover) => {
        setTypeTabHover(typeHover);
        setTypeTab('');
    };

    const handleMouseLeave = () => {
        setTypeTab(historyTab);
        setTypeTabHover('');
    };

    const handleClickChangeBottom = (typeBottom) => {
        setTypeButton(typeBottom);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('box-left')}>
                <p
                    className={cx('title-video', { activeLeft: typeTab === VID, hover: typeTabHover === VID })}
                    onClick={() => handleClickChangeType(VID)}
                    onMouseEnter={() => handleMouseEnter(VID)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className={cx('label')}>Videos</span>
                </p>
                <p
                    className={cx('title', { activeLeft: typeTab === FAV, hover: typeTabHover === FAV })}
                    onClick={() => handleClickChangeType(FAV)}
                    onMouseEnter={() => handleMouseEnter(FAV)}
                    onMouseLeave={handleMouseLeave}
                >
                    <PrivateIcon />
                    <span className={cx('label')}>Favorites</span>
                </p>
                <p
                    className={cx('title', { activeLeft: typeTab === LIK, hover: typeTabHover === LIK })}
                    onClick={() => handleClickChangeType(LIK)}
                    onMouseEnter={() => handleMouseEnter(LIK)}
                    onMouseLeave={handleMouseLeave}
                >
                    <PrivateIcon />
                    <span className={cx('label')}>Liked</span>
                </p>
            </div>
            <div className={cx('box-right')}>
                <button
                    className={cx('bt', { activeRight: typeButton === LAT })}
                    onClick={() => handleClickChangeBottom(LAT)}
                >
                    <div className={cx('text')}>Latest</div>
                </button>
                <button
                    className={cx('bt', { activeRight: typeButton === POP })}
                    onClick={() => handleClickChangeBottom(POP)}
                >
                    <div className={cx('text')}>Popular</div>
                </button>
                <button
                    className={cx('bt', { activeRight: typeButton === OLD })}
                    onClick={() => handleClickChangeBottom(OLD)}
                >
                    <div className={cx('text')}>Oldest</div>
                </button>
            </div>
        </div>
    );
};

export default Footer;
