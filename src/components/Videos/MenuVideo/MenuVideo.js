import classNames from 'classnames/bind';
import styles from './MenuVideo.module.scss';
import { TridentHorizontal } from '~/components/Icons';
const cx = classNames.bind(styles);
const MenuVideo = () => {
    return (
        <div className={cx('wrapper')}>
            <TridentHorizontal />
        </div>
    );
};

export default MenuVideo;
