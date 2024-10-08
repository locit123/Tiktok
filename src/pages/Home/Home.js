import { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VideoObService from '~/components/Videos/ObService';
import { getVideoList } from '~/services/VideoService';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as FollowService from '~/services/FollowService';
import Comment from '~/components/Videos/RightVideo/Comment';
import { debounce } from 'lodash';
const cx = classNames.bind(styles);
const Home = () => {
    //home
    const [listVideos, setListVideos] = useState([]);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [isShowComment, setIsShowComment] = useState(false);
    const [idVideo, setIdVideo] = useState('');
    const [uuidComment, setUuidComment] = useState('');
    const [countPage, setCountPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    console.log(totalPage, countPage);

    const wrapperRef = useRef(null);
    const getApiVideo = useCallback(async () => {
        if (countPage) {
            await getVideoList('for-you', countPage, setListVideos, setTotalPage);
        }
    }, [countPage]);

    useEffect(() => {
        getApiVideo();
    }, [getApiVideo]);

    const processedVideos = useMemo(() => {
        return listVideos.map((video) => ({
            ...video,
            formattedDate: new Date(video.createdAt).toLocaleDateString(),
        }));
    }, [listVideos]);
    useEffect(() => {
        let currentWrapperRef = wrapperRef.current;

        const handleScroll = debounce(() => {
            let scrollTop = currentWrapperRef.scrollTop + currentWrapperRef.clientHeight;
            let scrollHeight = currentWrapperRef.scrollHeight - 2;

            if (scrollTop >= scrollHeight) {
                if (countPage < totalPage) {
                    setCountPage((prev) => prev + 1);
                }
            }
        }, 300);
        currentWrapperRef.addEventListener('scroll', handleScroll);

        return () => {
            currentWrapperRef.removeEventListener('scroll', handleScroll);
        };
    }, [processedVideos.length, countPage, totalPage]);

    const handleClickFollow = useCallback(
        async (id, follow) => {
            if (follow === false) {
                await FollowService.FollowAUser(id, getApiVideo);
            } else {
                await FollowService.UnFollow(id, getApiVideo);
            }
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
                                setIsShowComment={setIsShowComment}
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
