import vd from '~/assets/videos/DownloadDemo.mp4';
import myImage from '~/assets/images/aFB.jpg';
import { ArrowIcon, ExistIcon, FloatingPlayerIcon, NoneSound, TridentHorizontal } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './BoxLeft.module.scss';

const cx = classNames.bind(styles);
const BoxLeft = ({ type }) => {
    return (
        <div className={cx('wrapper-left')}>
            <div className={cx('background')} style={{ backgroundImage: `url(${myImage})` }}></div>
            <video src={vd} muted loop autoPlay className={cx('video')}>
                <source src={vd} type={type || 'video/mp4'} />
            </video>
            <div className={cx('box-position-top')}>
                <div className={cx('icon')}>
                    <ExistIcon />
                </div>
                <div className={cx('icon')}>
                    <TridentHorizontal />
                </div>
            </div>
            <div className={cx('box-position-bottom')}>
                <div className={cx('icon')}>
                    <FloatingPlayerIcon />
                </div>
                <div className={cx('icon')}>
                    <NoneSound />
                </div>
            </div>
            <div className={cx('box-position-center')}>
                <div className={cx('icon', 'icon-arr')}>
                    <ArrowIcon />
                </div>
                <div className={cx('icon')}>
                    <ArrowIcon />
                </div>
            </div>
        </div>
    );
};

export default BoxLeft;
