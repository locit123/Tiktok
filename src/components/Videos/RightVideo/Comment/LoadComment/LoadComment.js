import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './LoadComment.module.scss';
import { ArrowIcon, FavoriteNoneSoilIcon, FavoriteSoilIcon } from '~/components/Icons';
import DeleteComment from '../DeleteComment';
import React, { useState } from 'react';
import { TimeDay } from '~/utils/TimeMoment';

const cx = classNames.bind(styles);

const LoadComment = ({ view, handleClickFavoriteComment, data, setShowModal, setIdComment }) => {
    const [visible, setVisible] = useState(false);
    const [hoverComment, setHoverComment] = useState(null);

    const handleClickOutSide = () => {
        setVisible(false);
    };

    const handleClickToggle = () => {
        setVisible(true);
    };

    const onMouseEnter = () => {
        setHoverComment(data.id);
    };

    const onMouseLeave = () => {
        setHoverComment(null);
    };
    //DELETE COMMENT

    const handleClickDelete = () => {
        setIdComment(data.id);
        setShowModal(true);
    };

    return (
        <div className={cx('box-footer')} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Image src={data.user.avatar} alt="a" className={cx('avatar')} />
            <div className={cx('box-footer-right')}>
                <div className={cx('name')}>
                    {data.user.first_name}
                    {data.user.last_name}
                </div>
                {hoverComment === data.id && (
                    <DeleteComment
                        handleClickOutSide={handleClickOutSide}
                        handleClickToggle={handleClickToggle}
                        idUser={data.user.id}
                        visible={visible}
                        handleClickDelete={handleClickDelete}
                        setVisible={setVisible}
                    />
                )}
                <span className={cx('comment')}>{data.comment}</span>
                <div className={cx('box-footer-in')}>
                    <span className={cx('time')}>{TimeDay(data.created_at)}</span>
                    <div className={cx('box-footer-favorite')}>
                        {data.is_liked ? (
                            <div onClick={handleClickFavoriteComment}>
                                <FavoriteSoilIcon className={cx({ isLiked: data.is_liked })} />
                            </div>
                        ) : (
                            <div onClick={handleClickFavoriteComment}>
                                <FavoriteNoneSoilIcon />
                            </div>
                        )}
                        <span className={cx('total-favorite')}>{data.likes_count}</span>
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
