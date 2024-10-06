import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { ExistIcon } from '~/components/Icons';
import LoadComment from './LoadComment';
import * as CommentService from '~/services/CommentService';
const cx = classNames.bind(styles);
const Comment = ({ isShowComment, setIsShowComment, idVideo }) => {
    const [listComments, setListComments] = useState(false);
    const [listAvatar, setListAvatar] = useState([]);
    console.log(listComments, 'listComments');

    const getApiComment = useCallback(async () => {
        await CommentService.getListComments(idVideo, setListComments);
    }, [idVideo]);
    useEffect(() => {
        getApiComment();
    }, [getApiComment]);
    const handleClickExist = () => {
        setIsShowComment(false);
    };
    const getAvatar = useCallback(async () => {
        if (listComments && listComments.data.length > 0) {
            
        }
    }, [listComments]);

    useEffect(() => {
        getAvatar();
    }, [getAvatar]);
    return (
        <div className={cx('wrapper', { isShowComment })}>
            <div className={cx('box-header')}>
                <div className={cx('box-header-left')}>
                    <p className={cx('label')}>Comments</p>
                    <span className={cx('label2')}>({listComments?.meta?.pagination?.total ?? 0})</span>
                </div>

                <div className={cx('exist')} onClick={handleClickExist}>
                    <ExistIcon />
                </div>
            </div>
            <div className={cx('wrapper-scroll')}>
                {listComments.data && listComments.data.length > 0
                    ? listComments.data.map((comment, index) => (
                          <LoadComment
                              key={index}
                              comment={comment.comment}
                              username={`${comment.user.first_name} ${comment.user.last_name}`}
                              totalFavorite={comment.likes_count}
                              view={10}
                              time={comment.created_at}
                          />
                      ))
                    : 'No Comment'}
            </div>
        </div>
    );
};

export default Comment;
