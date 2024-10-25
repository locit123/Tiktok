import classNames from 'classnames/bind';
import styles from './Live.module.scss';
const cx = classNames.bind(styles);
const Live = () => {
    return <div className={cx('wrapper')}>live</div>;
};

export default Live;
