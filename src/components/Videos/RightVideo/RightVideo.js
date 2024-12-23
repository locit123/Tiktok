import classNames from 'classnames/bind';
import styles from './RightVideo.module.scss';
import { BookMarkIcon, CommentIcon, FavoriteIcon, PlusIcon, ShareIconSoil, TickIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
const RightVideo = ({
    avatar,
    isFollow,
    labelFavorite,
    labelComment,
    labelBookMark,
    labelShare,
    handleClickComment,
    handleClickFavorite,
    handleClickFollow,
    isLike,
}) => {
    return (
        <div className={cx('box-video')}>
            <div className={cx('box-right')}>
                <div className={cx('box-icon', 'icon-top')}>
                    <span className={cx('icon')}>
                        <img src={avatar} alt="a" className={cx('avatar')} />
                    </span>
                    <span onClick={handleClickFollow} className={cx('icon-plus')}>
                        {isFollow ? <TickIcon /> : <PlusIcon />}
                    </span>
                </div>
                <div className={cx('box-icon')}>
                    <span className={cx('icon', { isLike })} onClick={handleClickFavorite}>
                        <FavoriteIcon />
                    </span>
                    <strong className={cx('label')}>{labelFavorite}</strong>
                </div>
                <div className={cx('box-icon')} onClick={handleClickComment}>
                    <span className={cx('icon')}>
                        <CommentIcon />
                    </span>
                    <strong className={cx('label')}>{labelComment}</strong>
                </div>
                <div className={cx('box-icon')}>
                    <span className={cx('icon')}>
                        <BookMarkIcon />
                    </span>
                    <strong className={cx('label')}>{labelBookMark}</strong>
                </div>
                <div className={cx('box-icon')}>
                    <span className={cx('icon')}>
                        <ShareIconSoil />
                    </span>
                    <strong className={cx('label')}>{labelShare}</strong>
                </div>
            </div>
        </div>
    );
};

export default RightVideo;
