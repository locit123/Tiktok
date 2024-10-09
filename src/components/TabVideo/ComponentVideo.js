import classNames from 'classnames/bind';
import styles from './ComponentVideo.module.scss';

const cx = classNames.bind(styles);
const ComponentVideo = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default ComponentVideo;
