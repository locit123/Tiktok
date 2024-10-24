import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { ExistIcon } from '~/components/Icons';
import LoadComment from './LoadComment';
import * as CommentService from '~/services/CommentService';
import PostComment from './PostComment';
import ModalLast from '~/components/ModalLast';
import Button from '~/components/Button';
import * as LikeCommentService from '~/services/LikeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COMMENT_HOME, DELETE_FAILED, DELETE_SUCCESS } from '~/utils/contantValue';
import { ContextProvider } from '~/Context';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import ModalNotification from '~/components/Notification';
const cx = classNames.bind(styles);
const Comment = ({
    isShowComment,
    setIsShowComment,
    idVideo,
    typeAction,
    scrollTopHome,
    setTotalComment,
    totalComment,
}) => {
    const wrapperScrollRef = useRef(null);
    const [dataComment, setDataComment] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [idComment, setIdComment] = useState(null);
    const { isOpenModalNotification, setIsOpenModalNotification } = useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);

    useEffect(() => {
        if (scrollTopHome > 0) {
            wrapperScrollRef.current.scrollTop = 0;
            setPage(1);
        }
    }, [scrollTopHome]);

    useEffect(() => {
        const fetchApiComment = async () => {
            if (typeAction === COMMENT_HOME && idVideo) {
                try {
                    setLoading(true);
                    const result = await CommentService.getListComments(idVideo, page);
                    if (result && result.data) {
                        setLoading(false);
                        setCurrentPage(result.meta.pagination.current_page);
                        setTotalPages(result.meta.pagination.total_pages);
                        setTotalComment(result.meta.pagination.total);
                        if (page > 1) {
                            setDataComment((prev) => {
                                const newData = result.data.filter(
                                    (newComment) => !prev.some((prevComment) => prevComment.id === newComment.id),
                                );
                                return [...prev, ...newData];
                            });
                        } else {
                            setDataComment(result.data);
                        }
                    }
                } catch (error) {
                    setLoading(false);
                    console.log('failed get api Comment ', error);
                } finally {
                    setLoadingPage(false);
                }
            }
        };
        fetchApiComment();
    }, [idVideo, page, typeAction, setTotalComment, totalComment]);
    //Data Store Memo
    const dataListCommentsMemo = useMemo(() => {
        return dataComment && dataComment.length > 0 && dataComment.map((data) => ({ ...data }));
    }, [dataComment]);
    //Scroll
    useEffect(() => {
        let currentRef = wrapperScrollRef.current;
        const handleScroll = () => {
            let scrollTop = Math.round(currentRef.scrollTop + currentRef.clientHeight);
            let scrollHeight = currentRef.scrollHeight;
            if (scrollTop >= scrollHeight) {
                if (currentPage < totalPages && !loadingPage) {
                    setLoadingPage(true);
                    setPage((prev) => prev + 1);
                }
            }
        };
        currentRef.addEventListener('scroll', handleScroll);
        return () => {
            currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, loadingPage, totalPages]);
    //LIKE COMMENT
    const handleClickFavoriteComment = async (id, like, likeCount) => {
        if (like) {
            await LikeCommentService.unLikeAComment(id);
            setDataComment((prevComment) =>
                prevComment.map((comment) =>
                    comment.id === id ? { ...comment, is_liked: !like, likes_count: likeCount - 1 } : comment,
                ),
            );
        } else {
            await LikeCommentService.likeAComment(id);
            setDataComment((prevComment) =>
                prevComment.map((comment) =>
                    comment.id === id ? { ...comment, is_liked: !like, likes_count: likeCount + 1 } : comment,
                ),
            );
        }
    };

    //SubMit delete comment
    const handleClickSubmit = async () => {
        try {
            await CommentService.deleteComment(idComment);
            setTypeStatus(DELETE_SUCCESS);
            setDataComment((prevComment) => prevComment.filter((comment) => comment.id !== idComment));
            setTotalComment((prevTotal) => (prevTotal > 0 ? prevTotal - 1 : 0));
        } catch (error) {
            setTypeStatus(DELETE_FAILED);
            console.error('failed delete comment:', error);
        }
    };

    useEffect(() => {
        let time;
        if (typeStatus === DELETE_SUCCESS) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setShowModal(false);
                setIsOpenModalNotification(false);

                setTypeStatus(null);
            }, 1000);
        } else if (typeStatus === DELETE_FAILED) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setShowModal(false);

                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        }

        return () => {
            clearTimeout(time);
        };
    }, [setIsOpenModalNotification, setTypeStatus, typeStatus]);

    const handleClickCancel = () => {
        setShowModal(false);
        setIdComment(null);
    };

    //EXIST COMMENT
    const handleClickExist = () => {
        setIsShowComment(false);
    };
    return (
        <div className={cx('wrapper', { isShowComment })}>
            {typeStatus === DELETE_SUCCESS || typeStatus === DELETE_FAILED ? (
                <ModalNotification
                    modalIsOpen={isOpenModalNotification}
                    setIsOpen={setIsOpenModalNotification}
                    text={typeStatus === DELETE_SUCCESS ? DELETE_SUCCESS : DELETE_FAILED}
                />
            ) : (
                <></>
            )}
            <div className={cx('box-header')}>
                <div className={cx('box-header-left')}>
                    <p className={cx('label')}>Comments</p>
                    <span className={cx('label2')}>({totalComment ?? 0})</span>
                </div>

                <div className={cx('exist')} onClick={handleClickExist}>
                    <ExistIcon />
                </div>
            </div>
            <div className={cx('wrapper-scroll')} ref={wrapperScrollRef}>
                {dataListCommentsMemo && dataListCommentsMemo.length > 0
                    ? dataListCommentsMemo.map((comment, index) => (
                          <LoadComment
                              data={comment}
                              key={index}
                              view={10}
                              handleClickFavoriteComment={() =>
                                  handleClickFavoriteComment(comment.id, comment.is_liked, comment.likes_count)
                              }
                              setShowModal={setShowModal}
                              setIdComment={setIdComment}
                              commentHome
                          />
                      ))
                    : 'No Comment'}
            </div>
            <PostComment idVideo={idVideo} setDataComment={setDataComment} setTotalComment={setTotalComment} />
            <ModalLast isOpen={showModal} closeModal={setShowModal} className={cx('modal-delete')}>
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
            {loading && (
                <div className={cx('box-loading')}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                </div>
            )}
        </div>
    );
};

export default Comment;
