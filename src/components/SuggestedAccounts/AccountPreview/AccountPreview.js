import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const AccountPreview = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    alt="a"
                    src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/b9e1fb6031f81c5eb0d63a9dbbb1da27~c5_100x100.jpeg?lk3s=a5d48078&nonce=91837&refresh_token=add5810825d501b3b6792fa2c62886ac&x-expires=1726992000&x-signature=2QOptzQ1lg5LBzvX%2B2Ytcx8Xad0%3D&shp=a5d48078&shcp=81f88b70"
                />
                <Button primary className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>locphung</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Phung loc</p>

                <p className={cx('analytics')}>
                    <strong className={cx('value')}>10.0M</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>20.0M</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
};

export default AccountPreview;
