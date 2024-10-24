import PostComment from '~/components/Videos/RightVideo/Comment/PostComment';
import classNames from 'classnames/bind';
import styles from './BoxRight.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import {
    BookMarkIcon,
    CommentIcon,
    FacebookIcon,
    FavoriteIcon,
    MusicIcon,
    TelegramIcon,
    TickBlue,
    TwIcon,
    WhatsAppIcon,
} from '~/components/Icons';
import { ShareIconSoil } from '~/components/Icons/Icons';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as CommentService from '~/services/CommentService';
import LoadComment from '~/components/Videos/RightVideo/Comment/LoadComment';
import * as LikeService from '~/services/LikeService';
import { MonthDay } from '~/utils/ConvertDay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ModalLast from '~/components/ModalLast';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import { ContextProvider } from '~/Context';
import { DELETE_FAILED, DELETE_SUCCESS } from '~/utils/contantValue';
import ModalNotification from '~/components/Notification';
const cx = classNames.bind(styles);
const BoxRight = ({
    avatar,
    username,
    nickname,
    date,
    description,
    music,
    totalFavorite,
    totalBookMark,
    links,
    tick,
    idVideo,
    isFollow,
    handleClickFavorite,
    isLike,
    handleClickFollow,
    isClick,
    setIsClick,
}) => {
    const { setIsOpenModalNotification, isOpenModalNotification } = useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);
    const divRef = useRef(null);
    const [dataComment, setDataComment] = useState([]);
    const [isTab, setIsTab] = useState('comments');
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [totalComment, setTotalComment] = useState(null);
    const [idComment, setIdComment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isClick) {
            setPage(1);
            divRef.current.scrollTop = 0;
        }
        setIsClick(false);
    }, [isClick, setIsClick]);
    useEffect(() => {
        const fetchApiGetComment = async () => {
            if (idVideo) {
                try {
                    setLoading(true);
                    const res = await CommentService.getListComments(idVideo, page);
                    if (res && res.data) {
                        setLoading(false);
                        setCurrentPage(res.meta.pagination.current_page);
                        setTotalPage(res.meta.pagination.total_pages);
                        setTotalComment(res.meta.pagination.total);
                        if (page > 1) {
                            setDataComment((prevComment) => {
                                let newComment = res.data.filter(
                                    (commentNew) => !prevComment.some((prev) => prev.id === commentNew.id),
                                );

                                return [...prevComment, ...newComment];
                            });
                        } else {
                            setDataComment(res.data);
                        }
                    }
                } catch (error) {
                    setLoading(false);

                    console.log('fail api get comment', error);
                } finally {
                    setLoadingPage(false);
                }
            }
        };
        fetchApiGetComment();
    }, [idVideo, page, totalComment]);

    const dataStorage = useMemo(() => {
        return dataComment.map((comment) => ({ ...comment }));
    }, [dataComment]);

    const handleClickTab = (type) => {
        if (type === 'comments') {
            setIsTab('comments');
        } else {
            setIsTab('videos');
        }
    };
    //LIKE
    const handleClickFavoriteComment = async (id, like, likeCounts) => {
        if (like) {
            await LikeService.unLikeAComment(id);
        } else {
            await LikeService.likeAComment(id);
        }

        setDataComment((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id
                    ? { ...comment, is_liked: !like, likes_count: like ? likeCounts - 1 : likeCounts + 1 }
                    : comment,
            ),
        );
    };

    //Scroll
    useEffect(() => {
        const currentRef = divRef.current;
        const handleScroll = () => {
            let scrollTop = Math.round(currentRef.scrollTop + currentRef.clientHeight);
            let scrollHeight = currentRef.scrollHeight;

            if (scrollTop >= scrollHeight - 1) {
                if (currentPage < totalPage && !loadingPage) {
                    setLoadingPage(true);
                    setPage((prev) => prev + 1);
                }
            }
        };
        currentRef.addEventListener('scroll', handleScroll);
        return () => {
            currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, totalPage, loadingPage]);
    //SUBMIT DELETE COMMENT
    const handleClickSubmit = async () => {
        try {
            await CommentService.deleteComment(idComment);
            setTypeStatus(DELETE_SUCCESS);
            setDataComment((prevComment) => prevComment.filter((comment) => comment.id !== idComment));
            setTotalComment((prevTotal) => (prevTotal > 0 ? prevTotal - 1 : 0));
            setIdComment(null);
        } catch (error) {
            setTypeStatus(DELETE_FAILED);
            console.log('failed delete comment handleClickSubmit', error);
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
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        }

        return () => {
            clearTimeout(time);
        };
    }, [setIsOpenModalNotification, typeStatus, setTypeStatus]);
    const handleClickCancel = () => {
        setShowModal(false);
    };
    return (
        <div className={cx('wrapper-right')}>
            {typeStatus === DELETE_SUCCESS || typeStatus === DELETE_FAILED ? (
                <ModalNotification
                    modalIsOpen={isOpenModalNotification}
                    setIsOpen={setIsOpenModalNotification}
                    text={typeStatus === DELETE_SUCCESS ? DELETE_SUCCESS : DELETE_FAILED}
                />
            ) : (
                <></>
            )}
            <div className={cx('box-top')} ref={divRef}>
                <div>
                    <div className={cx('box-1')}>
                        <div className={cx('box-border-top')}>
                            <div className={cx('item-top')}>
                                <div className={cx('text-span')}>
                                    <Image className={cx('avatar')} src={avatar} alt={''} />
                                    <div className={cx('box-text')}>
                                        <div className={cx('text-username')}>
                                            <span>{username}</span>
                                            {tick && (
                                                <div className={cx('icon-tick')}>
                                                    <TickBlue />
                                                </div>
                                            )}
                                        </div>
                                        <span className={cx('text-nickname')}>
                                            {nickname} - {MonthDay(date)}
                                        </span>
                                    </div>
                                </div>
                                <Button className={cx('bt', { isFollow })} primary onClick={handleClickFollow}>
                                    {isFollow ? 'Following' : 'Follow'}
                                </Button>
                            </div>
                            <div className={cx('item-top-footer')}>
                                <span className={cx('text-description')}>{description}</span>
                                <div className={cx('box-music')}>
                                    <MusicIcon />
                                    {music}
                                </div>
                            </div>
                        </div>
                        <div className={cx('box-body')}>
                            <div className={cx('box-body-left')}>
                                <div className={cx('box-icon')}>
                                    <div className={cx('icon')} onClick={handleClickFavorite}>
                                        <FavoriteIcon width="2rem" height="2rem" className={cx({ isLike })} />
                                    </div>
                                    <span className={cx('text-views')}>{totalFavorite}</span>
                                </div>
                                <div className={cx('box-icon')}>
                                    <div className={cx('icon')}>
                                        <CommentIcon width="2rem" height="2rem" />
                                    </div>
                                    <span className={cx('text-views')}>{totalComment}</span>
                                </div>
                                <div className={cx('box-icon')}>
                                    <div className={cx('icon')}>
                                        <BookMarkIcon width="2rem" height="2rem" />
                                    </div>
                                    <span className={cx('text-views')}>{totalBookMark}</span>
                                </div>
                            </div>
                            <div className={cx('box-icon-footer')}>
                                <TwIcon width="2.4rem" height="2.4rem" />
                                <FacebookIcon width="2.4rem" height="2.4rem" />
                                <TelegramIcon width="2.4rem" height="2.4rem" />
                                <TwIcon width="2.4rem" height="2.4rem" />
                                <WhatsAppIcon width="2.4rem" height="2.4rem" />
                                <ShareIconSoil width="1.6rem" height="1.6rem" />
                            </div>
                        </div>
                        <div className={cx('box-link')}>
                            <p className={cx('link')}>{links}</p>
                            <button className={cx('bt-copy')}>Copy link</button>
                        </div>
                    </div>
                    {/* //buttom */}
                    <div className={cx('box-tab')}>
                        <div className={cx('tab')} onClick={() => handleClickTab('comments')}>
                            <span className={cx('text-tab', { active: isTab === 'comments' })}>
                                Comments ({totalComment})
                            </span>
                        </div>
                        <div className={cx('tab')} onClick={() => handleClickTab('videos')}>
                            <span className={cx('text-tab', { active: isTab === 'videos' })}>Creator videos</span>
                        </div>
                    </div>
                    <div className={cx('box-comment')}>
                        {isTab === 'comments' ? (
                            dataStorage && dataStorage.length > 0 ? (
                                dataStorage.map((comment, index) => {
                                    return (
                                        <LoadComment
                                            key={index}
                                            data={comment}
                                            handleClickFavoriteComment={() =>
                                                handleClickFavoriteComment(
                                                    comment.id,
                                                    comment.is_liked,
                                                    comment.likes_count,
                                                )
                                            }
                                            setIdComment={setIdComment}
                                            setShowModal={setShowModal}
                                            view={10}
                                            visibleFavorite
                                            iconFavoriteRight
                                        />
                                    );
                                })
                            ) : (
                                <div>No data comments</div>
                            )
                        ) : (
                            <div>Chưa làm</div>
                        )}
                    </div>
                </div>
            </div>

            {loading && (
                <div className={cx('box-loading')}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                </div>
            )}
            <div className={cx('box-bottom')}>
                <PostComment idVideo={idVideo} setDataComment={setDataComment} setTotalComment={setTotalComment} />
            </div>
            <ModalLast isOpen={showModal} closeModal={setShowModal} className={cx('modal-delete')}>
                <span className={cx('text-modal')}>Are you sure you want to delete this comment?</span>
                <div className={cx('bt-modal')}>
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

export default BoxRight;
