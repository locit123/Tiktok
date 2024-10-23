import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as VideoService from '~/services/VideoService';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import VideoObService from '~/components/Videos/ObService';
import Comment from '~/components/Videos/RightVideo/Comment';
import { COMMENT_HOME } from '~/utils/contantValue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Following = () => {
    const wrapperRef = useRef(null);
    const [listVideos, setListVideos] = useState([]);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [isShowComment, setIsShowComment] = useState(false);
    const [idVideo, setIdVideo] = useState('');
    const [page, setPage] = useState(1);
    const [typeAction, setTypeAction] = useState(null);
    const [totalComment, setTotalComment] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [scrollTopHome, setScrollTopHome] = useState(null);

    useEffect(() => {
        const getApiVideo = async () => {
            try {
                setLoading(true);
                const result = await VideoService.getVideoList('following', page);
                if (result && result.data) {
                    setLoading(false);

                    setCurrentPage(result.meta.pagination.current_page);
                    setTotalPage(result.meta.pagination.total_pages);
                    if (page > 1) {
                        setListVideos((prevVideo) => [...prevVideo, ...result.data]);
                    } else {
                        setListVideos(result.data);
                    }
                }
            } catch (error) {
                setLoading(false);

                console.log('failed api get following videos', error);
            } finally {
                setLoadingPage(false);
            }
        };

        getApiVideo();
    }, [page]);

    const processedVideos = useMemo(() => {
        return listVideos.map((video) => ({
            ...video,
            formattedDate: new Date(video.created_at).toLocaleDateString(),
        }));
    }, [listVideos]);

    const handleClickComment = (id) => {
        setTypeAction(COMMENT_HOME);
        setIdVideo(id);
        setIsShowComment(!isShowComment);
    };

    //SCROLL

    useEffect(() => {
        let currentRef = wrapperRef.current;

        const handleScroll = () => {
            setScrollTopHome(currentRef.scrollTop);
            let scrollTop = Math.round(currentRef.scrollTop + currentRef.clientHeight);
            let scrollHeight = currentRef.scrollHeight;
            if (scrollTop >= scrollHeight) {
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
    }, [totalPage, currentPage, loadingPage]);
    return (
        <div className={cx('wrapper-children')}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Following - Watch videos from creators you follow | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className={cx('wrapper')} ref={wrapperRef}>
                {processedVideos && processedVideos.length > 0 ? (
                    processedVideos.map((video, index) => {
                        return (
                            <VideoObService
                                key={index}
                                className={cx('video-item')}
                                data={video}
                                handleClickComment={() => handleClickComment(video.id)}
                                isMuted={isMuted}
                                setIdVideo={setIdVideo}
                                setIsMuted={setIsMuted}
                                setListVideos={setListVideos}
                                setTypeAction={setTypeAction}
                                setVolume={setVolume}
                                volume={volume}
                                totalComment={totalComment}
                            />
                        );
                    })
                ) : (
                    <div>No videos</div>
                )}
            </div>
            {isShowComment && (
                <Comment
                    idVideo={idVideo}
                    isShowComment={isShowComment}
                    setIsShowComment={setIsShowComment}
                    setTotalComment={setTotalComment}
                    totalComment={totalComment}
                    typeAction={typeAction}
                    scrollTopHome={scrollTopHome}
                />
            )}

            {loading && (
                <div className={cx('box-loading')}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                </div>
            )}
        </div>
    );
};

export default Following;
