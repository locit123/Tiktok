import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import BoxLeft from './BoxLeft';
import BoxRight from './BoxRight';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as VideoService from '~/services/VideoService';
import { useNavigate, useParams } from 'react-router-dom';
import * as FollowService from '~/services/FollowService';
import * as LikeService from '~/services/LikeService';
import { ARROW_UP, BODY_VIDEO, FIRST_VIDEO, LAST_VIDEO } from '~/utils/contantValue';

const cx = classNames.bind(styles);
const Video = () => {
    const [dataVideo, setDataVideo] = useState({});
    const [listVideosUser, setListVideosUser] = useState([]);
    const [index, setIndex] = useState();
    const [typeOffsetVideo, setTypeOffsetVideo] = useState('');
    const [statusVideo, setStatusVideo] = useState(false);
    const { nickname, uuid } = useParams();
    const navigate = useNavigate();
    console.log(index);

    const getLinks = () => {
        return window.location.href;
    };

    const getApiAVideo = useCallback(async () => {
        await VideoService.getAVideo(uuid, setDataVideo);
    }, [uuid]);

    useEffect(() => {
        getApiAVideo();
    }, [getApiAVideo]);

    const handleClickExist = () => {
        navigate(`/${nickname}`);
    };
    const handleClickFollow = async (id, follow) => {
        if (follow) {
            await FollowService.UnFollow(id);
        } else {
            await FollowService.FollowAUser(id);
        }
        await getApiAVideo();
    };
    const handleClickFavorite = async (id, like) => {
        if (like) {
            await LikeService.unLikeAPost(id);
        } else {
            await LikeService.likeAPost(id);
        }
        await getApiAVideo();
    };

    const getApiUserVideos = useCallback(async () => {
        if (dataVideo.user_id) {
            await VideoService.getUsersVideo(dataVideo.user_id, setListVideosUser);
        }
    }, [dataVideo.user_id]);

    useEffect(() => {
        getApiUserVideos();
    }, [getApiUserVideos]);

    const dataUserVideos = useMemo(() => {
        return listVideosUser.map((video) => ({ ...video }));
    }, [listVideosUser]);

    useEffect(() => {
        if (dataUserVideos && dataUserVideos.length > 0) {
            if (uuid) {
                let indexVideo = dataUserVideos.findIndex((video) => {
                    return video.uuid === uuid;
                });
                if (indexVideo > -1) {
                    if (indexVideo === 0) {
                        setTypeOffsetVideo(FIRST_VIDEO);
                        setIndex(indexVideo);
                    } else if (indexVideo === dataUserVideos.length - 1) {
                        setIndex(indexVideo);
                        setTypeOffsetVideo(LAST_VIDEO);
                    } else {
                        setIndex(indexVideo);
                        setTypeOffsetVideo(BODY_VIDEO);
                    }
                } else {
                    setIndex(null);
                }
            }
        }
    }, [dataUserVideos, uuid]);
    const handleClickOffsetVideo = (type) => {
        setStatusVideo(true);
        setIndex((prev) => {
            const newIndex = type === ARROW_UP ? prev + 1 : prev - 1;
            if (newIndex >= 0 && newIndex < dataUserVideos.length) {
                const value = dataUserVideos[newIndex];
                navigate(`/@${value.user.nickname}/video/${value.uuid}`);
                return newIndex;
            }
            return prev;
        });
    };
    return (
        <div className={cx('wrapper')}>
            {dataVideo && typeof dataVideo === 'object' && dataVideo !== null && typeof dataVideo !== 'undefined' && (
                <>
                    <BoxLeft
                        src={dataVideo.file_url}
                        url={dataVideo.thumb_url}
                        type={dataVideo?.meta?.mime_type}
                        handleClickExist={handleClickExist}
                        width={dataVideo?.meta?.video?.resolution_x}
                        typeOffsetVideo={typeOffsetVideo}
                        handleClickOffsetVideo={handleClickOffsetVideo}
                        dataUserVideos={dataUserVideos[index]}
                        statusVideo={statusVideo}
                    />
                    <BoxRight
                        avatar={dataVideo?.user?.avatar}
                        date={dataVideo.published_at}
                        nickname={dataVideo?.user?.nickname || 'vo danh'}
                        description={dataVideo.description || 'Video hay'}
                        music={dataVideo.music || 'Nhac demo'}
                        totalFavorite={dataVideo.likes_count}
                        totalComment={dataVideo.comments_count}
                        totalBookMark={dataVideo.shares_count}
                        username={`${dataVideo?.user?.first_name} ${dataVideo?.user?.last_name}`}
                        tick={dataVideo?.user?.tick}
                        links={getLinks()}
                        idVideo={dataVideo.id}
                        handleClickFollow={() => handleClickFollow(dataVideo.user_id, dataVideo?.user?.is_followed)}
                        isFollow={dataVideo?.user?.is_followed}
                        isLike={dataVideo?.is_liked}
                        handleClickFavorite={() => handleClickFavorite(dataVideo.id, dataVideo.is_liked)}
                    />
                </>
            )}
        </div>
    );
};

export default Video;
