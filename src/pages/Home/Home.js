import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VideoObService from '~/components/Videos/ObService';
import { getVideoList } from '~/services/VideoService';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as FollowService from '~/services/FollowService';
import Comment from '~/components/Videos/RightVideo/Comment';
const cx = classNames.bind(styles);
const Home = () => {
    const [listVideos, setListVideos] = useState([]);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [isShowComment, setIsShowComment] = useState(false);
    const [idVideo, setIdVideo] = useState('');
    const [uuidComment, setUuidComment] = useState('');
    useEffect(() => {
        getApiVideo();
    }, []);

    const getApiVideo = async () => {
        await getVideoList('for-you', '1', setListVideos);
    };

    const handleClickFollow = async (id, follow) => {
        if (follow === false) {
            await FollowService.FollowAUser(id, getApiVideo);
        } else {
            await FollowService.UnFollow(id, getApiVideo);
        }
    };

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

            <div className={cx('wrapper')}>
                {listVideos && listVideos.length > 0 ? (
                    listVideos.map((video, index) => {
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
