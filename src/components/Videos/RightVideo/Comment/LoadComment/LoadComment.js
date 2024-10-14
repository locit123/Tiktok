import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './LoadComment.module.scss';
import { ArrowIcon, FavoriteNoneSoilIcon, FavoriteSoilIcon } from '~/components/Icons';
import DeleteComment from '../DeleteComment';
import React from 'react';
import { MonthDay } from '~/utils/ConvertDay';

const cx = classNames.bind(styles);

const LoadComment = ({
    src,
    username,
    comment,
    time,
    totalFavorite,
    view,
    onMouseEnter,
    hoverComment,
    onMouseLeave,
    idUser,
    idComment,
    handleClickDelete,
    handleClickToggle,
    handleClickOutSide,
    visible,
    setVisible,
    isLiked,
    handleClickFavoriteComment,
}) => {
    return (
        <div className={cx('box-footer')} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Image src={src} alt="a" className={cx('avatar')} />
            <div className={cx('box-footer-right')}>
                <div className={cx('name')}>{username}</div>
                {hoverComment && (
                    <DeleteComment
                        handleClickOutSide={handleClickOutSide}
                        handleClickToggle={handleClickToggle}
                        idUser={idUser}
                        username={username}
                        visible={visible}
                        idComment={idComment}
                        handleClickDelete={handleClickDelete}
                        setVisible={setVisible}
                    />
                )}
                <span className={cx('comment')}>{comment}</span>
                <div className={cx('box-footer-in')}>
                    <span className={cx('time')}>{MonthDay(time)}</span>
                    <div className={cx('box-footer-favorite')}>
                        {isLiked ? (
                            <div onClick={handleClickFavoriteComment}>
                                <FavoriteSoilIcon className={cx({ isLiked })} />
                            </div>
                        ) : (
                            <div onClick={handleClickFavoriteComment}>
                                <FavoriteNoneSoilIcon />
                            </div>
                        )}
                        <span className={cx('total-favorite')}>{totalFavorite}</span>
                    </div>
                    <span className={cx('text-reply')}>Reply</span>
                </div>
                <div className={cx('box-footer-bottom')}>
                    <span className={cx('line')}></span>
                    <div className={cx('view')}>Views {view} replies</div>
                    <ArrowIcon width="1.2rem" height="1.2rem" />
                </div>
            </div>
        </div>
    );
};

export default React.memo(LoadComment);
