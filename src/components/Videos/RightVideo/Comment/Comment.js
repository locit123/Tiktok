import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { ExistIcon } from '~/components/Icons';
import LoadComment from './LoadComment';
import * as CommentService from '~/services/CommentService';
import { TimeDay } from '~/utils/TimeMoment';
import PostComment from './PostComment';
import ModalLast from '~/components/ModalLast';
import { ContextProvider } from '~/Context';
import Button from '~/components/Button';
import * as LikeCommentService from '~/services/LikeService';
const cx = classNames.bind(styles);
const Comment = ({ isShowComment, setIsShowComment, idVideo, uuidComment }) => {
    const [listComments, setListComments] = useState([]);
    const [idComment, setIdComment] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { setIsShow } = useContext(ContextProvider);
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);
    const [totalPage, setTotalPage] = useState(0);

    const wrapperScrollRef = useRef(null);

    const getApiComment = useCallback(async () => {
        if (idVideo) {
            await CommentService.getListComments(idVideo, setListComments, 1, setTotalPage);
        }
    }, [idVideo]);
    useEffect(() => {
        getApiComment();
    }, [getApiComment]);

    const dataStorageComment = useMemo(() => {
        if (listComments && listComments?.length > 0) {
            return listComments.map((comment) => ({ ...comment }));
        }
    }, [listComments]);

    const handleClickExist = () => {
        setIsShowComment(false);
    };
    const handleOnMouseEnter = useCallback((id) => {
        setIdComment(id);
    }, []);

    const handleOnMouseLeave = useCallback(() => {
        setIdComment('');
    }, []);

    const handleClickCancel = () => {
        setIsOpen(false);
        setId('');
    };

    const handleClickDelete = (id) => {
        setIsOpen(true);
        setId(id);
    };

    const handleClickToggle = () => {
        setVisible(true);
    };

    const handleClickOutSide = () => {
        setVisible(false);
    };
    const handleClickSubmit = async () => {
        await CommentService.deleteComment(id, getApiComment, setIsOpen);
    };

    const handleClickFavoriteComment = useCallback(
        async (idComment, likeComment) => {
            if (!likeComment) {
                await LikeCommentService.likeAComment(idComment, getApiComment);
            } else {
                await LikeCommentService.unLikeAComment(idComment, getApiComment);
            }
        },
        [getApiComment],
    );
    return (
        <div className={cx('wrapper', { isShowComment })}>
            <div className={cx('box-header')}>
                <div className={cx('box-header-left')}>
                    <p className={cx('label')}>Comments</p>
                    <span className={cx('label2')}>({totalPage ?? 0})</span>
                </div>

                <div className={cx('exist')} onClick={handleClickExist}>
                    <ExistIcon />
                </div>
            </div>
            <div className={cx('wrapper-scroll')} ref={wrapperScrollRef}>
                {dataStorageComment && dataStorageComment.length > 0
                    ? dataStorageComment.map((comment, index) => (
                          <LoadComment
                              key={index}
                              comment={comment.comment}
                              username={`${comment.user.first_name} ${comment.user.last_name}`}
                              totalFavorite={comment.likes_count}
                              view={10}
                              time={TimeDay(comment.created_at)}
                              src={comment.user.avatar}
                              onMouseEnter={() => handleOnMouseEnter(comment.id)}
                              hoverComment={idComment === comment.id}
                              onMouseLeave={handleOnMouseLeave}
                              idUser={comment.user.id}
                              idComment={comment.id}
                              handleClickDelete={() => handleClickDelete(comment.id)}
                              handleClickToggle={handleClickToggle}
                              handleClickOutSide={handleClickOutSide}
                              visible={visible}
                              setVisible={setVisible}
                              isLiked={comment.is_liked}
                              handleClickFavoriteComment={() =>
                                  handleClickFavoriteComment(comment.id, comment.is_liked)
                              }
                          />
                      ))
                    : 'No Comment'}
            </div>
            <PostComment uuidComment={uuidComment} getApiComment={getApiComment} />
            <ModalLast isOpen={isOpen} closeModal={setIsShow} className={cx('modal-delete')}>
                <span className={cx('text-modal')}>Are you sure you want to delete this comment?</span>
                <div className={cx('bt')}>
                    <Button primary className={cx('de-bt')} onClick={handleClickSubmit}>
                        Delete
                    </Button>
                    <Button className={cx('ca-bt')} outline onClick={handleClickCancel}>
                        Cancel
                    </Button>
                </div>
            </ModalLast>
        </div>
    );
};

export default Comment;
