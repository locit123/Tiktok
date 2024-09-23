import classNames from 'classnames/bind';
import styles from './SelectMethod.module.scss';
const cx = classNames.bind(styles);

const SelectMethod = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default SelectMethod;
