import classNames from 'classnames/bind';
import styles from './WrapperSmartphone.module.scss';
const cx = classNames.bind(styles);
const WrapperSmartphone = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default WrapperSmartphone;
