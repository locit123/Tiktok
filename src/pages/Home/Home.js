import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VideoObService from '~/components/Videos/ObService';
import { getVideoList } from '~/services/VideoService';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Home = () => {
    const [listVideos, setListVideos] = useState([]);
    const [linkPage, setLinkPage] = useState('');
    const [loading, setLoading] = useState(false);

    console.log(linkPage);
    useEffect(() => {
        getApiVideo();
    }, []);

    const getApiVideo = async () => {
        setLoading(true);
        await getVideoList('for-you', '1', setListVideos, setLinkPage);
        setLoading(false);
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

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Watch trending videos for you | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className={cx('wrapper')}>
                {loading ? (
                    <FontAwesomeIcon icon={faSpinner} className={cx('icon-spinner')} />
                ) : listVideos && listVideos.length > 0 ? (
                    listVideos.map((video, index) => {
                        return (
                            <div className={cx('scroll')}>
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
                                />
                            </div>
                        );
                    })
                ) : (
                    'No Video'
                )}
            </div>
        </div>
    );
};

export default Home;
