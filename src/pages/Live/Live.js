import classNames from 'classnames/bind';
import styles from './Live.module.scss';
const cx = classNames.bind(styles);
const Live = () => {
    return (
        <div className={cx('wrapper')}>
            <input type="range" min={0} value={'50'} max={1} className={cx('ip-volume')} step={0.1} />
        </div>
    );
};

export default Live;
