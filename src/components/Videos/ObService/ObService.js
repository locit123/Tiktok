import classNames from 'classnames/bind';
import styles from './Observice.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import RightVideo from '../RightVideo';
import Video from '../Video';
import * as likeService from '~/services/LikeService';
import * as followService from '~/services/FollowService';
import { FOLLOW_HOME, LIKE_HOME } from '~/utils/contantValue';

const cx = classNames.bind(styles);
const VideoObService = ({
    data,
    className,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    setListVideos,
    handleClickComment,
    setIdVideo,
    setTypeAction,
    totalComment,
}) => {
    console.log(totalComment, 'totalComment');

    const [visibleVideo, setVisibleVideo] = useState(false);
    let divRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log('chạy dô dây IntersectionObserver');

                let isVisible = entry.isIntersecting;
                setVisibleVideo(isVisible);
                setIdVideo(data.id);
            },
            { threshold: 1 },
        );

        let currentRef = divRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => currentRef && observer.unobserve(currentRef);
    }, [data, setVisibleVideo, setIdVideo]);
    //LIKE POST
    const handleClickFavorite = async () => {
        setTypeAction(LIKE_HOME);
        try {
            if (!data.is_liked) {
                await likeService.likeAPost(data.id);
                setListVideos((prevVideos) =>
                    prevVideos.map((video) =>
                        video.id === data.id
                            ? { ...video, is_liked: !data.is_liked, likes_count: data.likes_count + 1 }
                            : video,
                    ),
                );
            } else {
                await likeService.unLikeAPost(data.id);
                setListVideos((prevVideos) =>
                    prevVideos.map((video) =>
                        video.id === data.id
                            ? { ...video, is_liked: !data.is_liked, likes_count: data.likes_count - 1 }
                            : video,
                    ),
                );
            }
        } catch (error) {
            console.log('faille like a post', error);
        }
    };
    //FOLLOW
    const handleClickFollow = async () => {
        setTypeAction(FOLLOW_HOME);
        try {
            if (!data.user.is_followed) {
                await followService.FollowAUser(data.user.id);
                setListVideos((prevVideos) =>
                    prevVideos.map((video) =>
                        video.user.id === data.user.id
                            ? {
                                  ...video,
                                  user: {
                                      ...video.user,
                                      is_followed: !data.user.is_followed,
                                  },
                              }
                            : video,
                    ),
                );
            } else {
                await followService.UnFollow(data.user.id);
                setListVideos((prevVideos) =>
                    prevVideos.map((video) =>
                        video.user.id === data.user.id
                            ? {
                                  ...video,
                                  user: {
                                      ...video.user,
                                      is_followed: !data.user.is_followed,
                                  },
                              }
                            : video,
                    ),
                );
            }
        } catch (error) {
            console.log('faille follow a User', error);
        }
    };

    const classes = cx('wrapper', { [className]: className });
    return (
        <div className={classes}>
            {data && (
                <>
                    <div className={cx('video')} ref={divRef}>
                        <Video
                            src={data.file_url}
                            type={data.type}
                            file_img={data.thumb_url}
                            isMuted={isMuted}
                            setIsMuted={setIsMuted}
                            volume={volume}
                            setVolume={setVolume}
                            nickName={data.user.nickname}
                            description={data.description}
                            music={data.music}
                            visibleVideo={visibleVideo}
                        />
                    </div>
                    <RightVideo
                        avatar={data.user.avatar}
                        labelBookMark={data.views_count}
                        labelComment={totalComment === null ? data.comments_count : totalComment}
                        labelFavorite={data.likes_count}
                        labelShare={data.shares_count}
                        isLike={data.is_liked}
                        isFollow={data.user.is_followed}
                        handleClickFavorite={handleClickFavorite}
                        handleClickFollow={handleClickFollow}
                        handleClickComment={handleClickComment}
                    />
                </>
            )}
        </div>
    );
};

export default React.memo(VideoObService);
