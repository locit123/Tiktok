import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SuggestedAccounts.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
const cx = classNames.bind(styles);

const AccountItem = () => {
    const renderAccount = (attrs) => (
        <div {...attrs} tabIndex={'-1'}>
            <PopperWrapper>
                <AccountPreview />
            </PopperWrapper>
        </div>
    );
    return (
        <div>
            <Tippy interactive placement="bottom" delay={[500, 500]} render={renderAccount} offset={[-20, 0]}>
                <div className={cx('account-item')}>
                    <img
                        src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/b9e1fb6031f81c5eb0d63a9dbbb1da27~c5_100x100.jpeg?lk3s=a5d48078&nonce=91837&refresh_token=add5810825d501b3b6792fa2c62886ac&x-expires=1726992000&x-signature=2QOptzQ1lg5LBzvX%2B2Ytcx8Xad0%3D&shp=a5d48078&shcp=81f88b70"
                        alt=""
                        className={cx('avatar')}
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>locphung</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Phung loc</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default AccountItem;
