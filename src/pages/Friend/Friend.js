import { VideoObService } from '~/components/Box';
import classNames from 'classnames/bind';
import styles from './Friend.module.scss';
const cx = classNames.bind(styles);
const Friend = () => {
    return (
        <div className={cx('wrapper')}>
            <VideoObService />
        </div>
    );
};

export default Friend;
