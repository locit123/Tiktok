import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';

import a from '~/assets/images/aFB.jpg';
import EditProfile from './EditProfile';
import MenuShare from './MenuShare';

const cx = classNames.bind(styles);

const Header = () => {
    let css = true;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-header')}>
                <div className={cx('header')}>
                    <Image src={a} alt="test" className={cx('avatar')} />
                    <div className={cx('footer')}>
                        <div>
                            <h1 className={cx('nickname')}>Phungloc2003</h1>
                            <h2 className={cx('label')}>locsuper</h2>
                        </div>
                        <div className={cx('edit-profile')}>
                            <EditProfile />
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>2</strong>
                        <span className={cx('label-body', { css })}>Following</span>
                    </div>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>2</strong>
                        <span className={cx('label-body', { css })}>Followers</span>
                    </div>
                    <div className={cx('box-items')}>
                        <strong className={cx('number')}>0</strong>
                        <span className={cx('label-body')}>Likes</span>
                    </div>
                </div>
                <h2 className={cx('footer-title')}>No bio yet.</h2>
            </div>
            <div className={cx('wrapper-footer')}>
                <MenuShare />
            </div>
        </div>
    );
};

export default Header;
