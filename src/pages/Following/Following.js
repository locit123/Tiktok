import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as VideoService from '~/services/VideoService';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import VideoObService from '~/components/Videos/ObService';
import * as FollowService from '~/services/FollowService';

const cx = classNames.bind(styles);
const Following = () => {
    const [listVideoFollowings, setListVideoFollowings] = useState([]);
    const [linkPage, setLinkPage] = useState('');
    console.log(listVideoFollowings, linkPage);

    useEffect(() => {
        getApiVideoFollowing();
    }, []);

    const getApiVideoFollowing = async () => {
        await VideoService.getVideoList('following', 1, setListVideoFollowings, setLinkPage);
    };

    const handleClickFollow = async (id, follow) => {
        if (follow === false) {
            await FollowService.FollowAUser(id, getApiVideoFollowing);
        } else {
            await FollowService.UnFollow(id, getApiVideoFollowing);
        }
    };
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Following - Watch videos from creators you follow | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className={cx('wrapper')}>
                {listVideoFollowings && listVideoFollowings.length > 0 ? (
                    listVideoFollowings.map((follow, index) => {
                        return (
                            <VideoObService
                                src={follow.file_url}
                                key={index}
                                data={follow}
                                avatar={follow.user.avatar}
                                labelFavorite={follow.likes_count}
                                labelComment={follow.comments_count}
                                labelShare={follow.shares_count}
                                labelBookMark={follow.views_count}
                                isCheckIcon={follow.user.is_followed}
                                type={follow.meta.mime_type}
                                nickname={follow.user.nickname}
                                description={follow.description}
                                nameMusic={follow.music}
                                onClick={() => handleClickFollow(follow.user_id, follow.user.is_followed)}
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

export default Following;
