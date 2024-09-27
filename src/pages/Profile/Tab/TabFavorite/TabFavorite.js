import classNames from 'classnames/bind';
import styles from './TabFavorite.module.scss';
import TabWrapper from '~/components/TabWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const TabFavorite = () => {
    return (
        <div className={cx('wrapper')}>
            <TabWrapper>
                <div className={cx('no-favorite')}>
                    <FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
                    <p className={cx('title')}>Favorite posts</p>
                    <p className={cx('label')}>Your favorite posts will appear here.</p>
                </div>
            </TabWrapper>
        </div>
    );
};

export default TabFavorite;
