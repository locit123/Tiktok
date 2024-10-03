import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VideoObService from '~/components/Videos/ObService';
import { getVideoList } from '~/services/VideoService';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as FollowService from '~/services/FollowService';
const cx = classNames.bind(styles);
const Home = () => {
    const [listVideos, setListVideos] = useState([]);
    useEffect(() => {
        getApiVideo();
    }, []);

    const getApiVideo = async () => {
        await getVideoList('for-you', '1', setListVideos);
    };

    const handleClickFollow = async (id, follow) => {
        console.log(follow);
        if (follow === false) {
            await FollowService.FollowAUser(id, getApiVideo);
        } else {
            await FollowService.UnFollow(id, getApiVideo);
        }
    };

    return (
        <div>
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
                            />
                        );
                    })
                ) : (
                    <div>No videos</div>
                )}
            </div>
        </div>
    );
};

export default Home;
