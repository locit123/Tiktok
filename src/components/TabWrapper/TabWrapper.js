import classNames from 'classnames/bind';
import styles from './TabWrap.module.scss';

const cx = classNames.bind(styles);

const TabWrapper = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default TabWrapper;
