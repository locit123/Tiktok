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
    const [linkPage, setLinkPage] = useState('');
    console.log(linkPage);

    useEffect(() => {
        getApiVideo();
    }, []);

    const getApiVideo = async () => {
        await getVideoList('for-you', '1', setListVideos, setLinkPage);
    };

    useEffect(() => {
        const handleScrollVideo = () => {
            if (window.innerHeight && window.scrollY >= document.body.offsetHeight) {
                getApiVideo();
            }
        };
        window.addEventListener('scroll', handleScrollVideo);

        return () => {
            window.removeEventListener('scroll', handleScrollVideo);
        };
    }, []);

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
                                src={video.file_url}
                                key={index}
                                data={video}
                                avatar={video.user.avatar}
                                labelFavorite={video.likes_count}
                                labelComment={video.comments_count}
                                labelShare={video.shares_count}
                                labelBookMark={video.views_count}
                                isCheckIcon={video.user.is_followed}
                                type={video.meta.mime_type}
                                nickname={video.user.nickname}
                                description={video.description}
                                nameMusic={video.music}
                                onClick={() => handleClickFollow(video.user_id, video.user.is_followed)}
                            />
                        );
                    })
                ) : (
                    <VideoObService />
                )}
            </div>
        </div>
    );
};

export default Home;
