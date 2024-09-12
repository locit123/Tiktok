import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const AccountItem = () => {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                alt="loc"
                loading="lazy"
                src="https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/565418d2995c24fc473bbc892ea39b67.jpeg?biz_tag=tiktok_user.user_cover&lk3s=30310797&nonce=12720&refresh_token=6303e1d29d7571045628270cb40bc689&shcp=-&shp=30310797&x-expires=1726243200&x-signature=%2BzRdWAa9vgfBVQsdpW3wTCvlL%2BM%3D"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
};

export default AccountItem;
