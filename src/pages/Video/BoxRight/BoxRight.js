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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as CommentService from '~/services/CommentService';
import LoadComment from '~/components/Videos/RightVideo/Comment/LoadComment';
import * as LikeService from '~/services/LikeService';
import { MonthDay } from '~/utils/ConvertDay';
const cx = classNames.bind(styles);
const BoxRight = ({
    avatar,
    username,
    nickname,
    date,
    description,
    music,
    totalFavorite,
    totalComment,
    totalBookMark,
    links,
    tick,
    idVideo,
    handleClickFollow,
    isFollow,
    handleClickFavorite,
    isLike,
}) => {
    const [isTab, setIsTab] = useState('comments');
    const [listDataComment, setListComments] = useState([]);
    const getApiComment = useCallback(async () => {
        if (idVideo) {
            await CommentService.getListComments(idVideo, setListComments, 1);
        }
    }, [idVideo]);
    useEffect(() => {
        getApiComment();
    }, [getApiComment]);

    const dataStorage = useMemo(() => {
        return listDataComment.map((comment) => ({ ...comment }));
    }, [listDataComment]);

    const divRef = useRef(null);
    const boxBodyRef = useRef(null);

    const handleClickTab = (type) => {
        if (type === 'comments') {
            setIsTab('comments');
        } else {
            setIsTab('videos');
        }
    };

    const handleClickFavoriteComment = async (id, like) => {
        if (like) {
            await LikeService.unLikeAComment(id);
        } else {
            await LikeService.likeAComment(id);
        }
        await getApiComment();
    };
    return (
        <div className={cx('wrapper-right')}>
            <div className={cx('box-top')} ref={divRef}>
                <div>
                    <div className={cx('box-1')} ref={boxBodyRef}>
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
                                            comment={comment.comment}
                                            src={comment?.user?.avatar}
                                            username={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                                            totalFavorite={comment.likes_count}
                                            isLiked={comment.is_liked}
                                            time={comment.created_at}
                                            view={10}
                                            handleClickFavoriteComment={() =>
                                                handleClickFavoriteComment(comment.id, comment.is_liked)
                                            }
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

            <div className={cx('box-bottom')}>
                <PostComment />
            </div>
        </div>
    );
};

export default BoxRight;
