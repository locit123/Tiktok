import { useContext, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VideoObService from '~/components/Videos/ObService';
import { getVideoList } from '~/services/VideoService';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Comment from '~/components/Videos/RightVideo/Comment';
import { COMMENT_HOME } from '~/utils/contantValue';
import { ContextProvider } from '~/Context';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
const cx = classNames.bind(styles);
const Home = () => {
    const wrapperRef = useRef(null);
    const [listVideos, setListVideos] = useState([]);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);
    const [idVideo, setIdVideo] = useState(null);
    const [typeAction, setTypeAction] = useState(null);
    const [scrollTopHome, setScrollTopHome] = useState(0);
    const [totalComment, setTotalComment] = useState(null);
    const { setIsShow, token, setTypeModal } = useContext(ContextProvider);
    const { typeStatus } = useContext(TypeContextProvider);

    useEffect(() => {
        const getApiListVideoForYou = async () => {
            try {
                setLoading(true);
                const result = await getVideoList('for-you', page);
                if (result && result.data) {
                    setLoading(false);
                    setCurrentPage(result.meta.pagination.current_page);
                    setTotalPage(result.meta.pagination.total_pages);
                    if (page > 1) {
                        setListVideos((prev) => [...prev, ...result.data]);
                    } else {
                        setListVideos(result.data);
                    }
                }
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            } finally {
                setLoadingPage(false);
            }
        };
        getApiListVideoForYou();
    }, [page, typeStatus]);

    const processedVideos = useMemo(() => {
        return listVideos.map((video) => ({
            ...video,
            formattedDate: new Date(video.created_at).toLocaleDateString(),
        }));
    }, [listVideos]);

    useEffect(() => {
        let currentRef = wrapperRef.current;
        const handleScroll = () => {
            setScrollTopHome(currentRef.scrollTop);
            let scrollTop = Math.round(currentRef.scrollTop + currentRef.clientHeight);
            let scrollHeight = currentRef.scrollHeight;
            console.log(scrollTop, scrollHeight, 'da toi cuoi trang');
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
    }, [totalPage, currentPage, loadingPage]);

    //COMMENT
    const handleClickComment = (id) => {
        if (token) {
            setTypeAction(COMMENT_HOME);
            setIdVideo(id);
            setIsShowComment((prev) => !prev);
        } else {
            setIsShow(true);
            setTypeModal('');
        }
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
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                volume={volume}
                                setVolume={setVolume}
                                setListVideos={setListVideos}
                                handleClickComment={() => handleClickComment(video.id)}
                                setIdVideo={setIdVideo}
                                setTypeAction={setTypeAction}
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
                    isShowComment={isShowComment}
                    setIsShowComment={setIsShowComment}
                    idVideo={idVideo}
                    typeAction={typeAction}
                    scrollTopHome={scrollTopHome}
                    setTotalComment={setTotalComment}
                    totalComment={totalComment}
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

export default Home;
