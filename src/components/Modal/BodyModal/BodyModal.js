import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BodyModal.mmodule.scss';

const cx = classNames.bind(styles);

const BodyModal = ({ children, titleHeader, titleLink }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-header')}>
                <div className={cx('title-header')}>{titleHeader}</div>
                <Link className={cx('title-link')}>{titleLink}</Link>
            </div>
            {children}
        </div>
    );
};

export default BodyModal;
