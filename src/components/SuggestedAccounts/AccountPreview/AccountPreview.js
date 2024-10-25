import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const AccountPreview = ({ avatar, isFollow, username, nickname, totalFollowing, totalLikes }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} alt="a" src={avatar} />
                {isFollow ? (
                    <Button primary className={cx('follow-btn', { isFollow })}>
                        Following
                    </Button>
                ) : (
                    <Button primary className={cx('follow-btn')}>
                        Follow
                    </Button>
                )}
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{username}</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{nickname}</p>

                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{totalFollowing}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{totalLikes}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
};

export default AccountPreview;
