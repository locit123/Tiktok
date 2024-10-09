import { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VideoObService from '~/components/Videos/ObService';
import { getVideoList } from '~/services/VideoService';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as FollowService from '~/services/FollowService';
import Comment from '~/components/Videos/RightVideo/Comment';
import * as LikeService from '~/services/LikeService';
const cx = classNames.bind(styles);
const Home = () => {
    //home
    const [listVideos, setListVideos] = useState([]);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [isShowComment, setIsShowComment] = useState(false);
    const [idVideo, setIdVideo] = useState('');
    const [uuidComment, setUuidComment] = useState('');

    const wrapperRef = useRef(null);
    const getApiVideo = useCallback(async () => {
        await getVideoList('for-you', 1, setListVideos);
    }, []);

    useEffect(() => {
        getApiVideo();
    }, [getApiVideo]);

    const processedVideos = useMemo(() => {
        return listVideos.map((video) => ({
            ...video,
            formattedDate: new Date(video.created_at).toLocaleDateString(),
        }));
    }, [listVideos]);

    const handleClickFollow = useCallback(
        async (id, follow) => {
            if (follow === false) {
                await FollowService.FollowAUser(id);
            } else {
                await FollowService.UnFollow(id);
            }
            await getApiVideo();
        },
        [getApiVideo],
    );

    const handleClickComment = (id, uuid) => {
        setIsShowComment((prev) => {
            if (prev) {
                setIdVideo('');
                setUuidComment('');
                return false;
            }
            setIdVideo(id);
            setUuidComment(uuid);
            return true;
        });
    };
    const handleClickFavorite = useCallback(
        async (id, like) => {
            if (!like) {
                await LikeService.likeAPost(id, getApiVideo);
            } else {
                await LikeService.unLikeAPost(id, getApiVideo);
            }
        },
        [getApiVideo],
    );
    return (
        <div className={cx('wrapper-children')}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Watch trending videos for you | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className={cx('wrapper')} ref={wrapperRef}>
                {processedVideos && processedVideos.length > 0 ? (
                    processedVideos.map((video, index) => {
                        return (
                            <VideoObService
                                className={cx('video-item')}
                                key={index}
                                data={video}
                                onClick={() => handleClickFollow(video.user_id, video.user.is_followed)}
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                volume={volume}
                                setVolume={setVolume}
                                handleClickComment={() => handleClickComment(video.id, video.uuid)}
                                setIdVideo={setIdVideo}
                                handleClickFavorite={() => handleClickFavorite(video.id, video.is_liked)}
                                isLike={video.is_liked}
                            />
                        );
                    })
                ) : (
                    <div>No videos</div>
                )}
            </div>
            {isShowComment && (
                <Comment
                    isShowComment={isShowComment}
                    setIsShowComment={setIsShowComment}
                    idVideo={idVideo}
                    uuidComment={uuidComment}
                />
            )}
        </div>
    );
};

export default Home;
