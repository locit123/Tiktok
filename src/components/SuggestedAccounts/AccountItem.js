import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SuggestedAccounts.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
const cx = classNames.bind(styles);

const AccountItem = ({ data }) => {
    const renderAccount = (attrs) => (
        <div {...attrs} tabIndex={'-1'}>
            <PopperWrapper>
                <AccountPreview
                    avatar={data.avatar}
                    isFollow={data.is_followed}
                    nickname={data.nickname}
                    totalFollowing={data.followers_count}
                    totalLikes={data.likes_count}
                    username={`${data.first_name} ${data.last_name}`}
                />
            </PopperWrapper>
        </div>
    );
    return (
        <div>
            <Tippy interactive placement="bottom" delay={[500, 500]} render={renderAccount} offset={[-20, 0]}>
                <div className={cx('account-item')}>
                    <img src={data.avatar} alt="" className={cx('avatar')} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>
                                {data.first_name} {data.last_name}
                            </strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.nickname}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default AccountItem;
