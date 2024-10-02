import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as VideoService from '~/services/VideoService';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import { ObService } from '~/components/Videos';
import BoxItem from '~/components/Box';
import * as UsersService from '~/services/UsersService';

import * as FollowService from '~/services/FollowService';

const cx = classNames.bind(styles);
const Following = () => {
    const [listVideoFollowings, setListVideoFollowings] = useState([]);
    const [linkPage, setLinkPage] = useState('');
    const [listUsersSuggested, setListUsersSuggested] = useState([]);
    const [visibleVideoId, setVisibleVideoId] = useState(null);

    console.log(linkPage);
    //get api follow
    useEffect(() => {
        getApiVideoFollowing();
    }, []);

    const getApiVideoFollowing = async () => {
        await VideoService.getVideoList('following', 1, setListVideoFollowings, setLinkPage);
    };

    //get api suggest
    useEffect(() => {
        getApiUsers();
    }, []);

    const getApiUsers = async () => {
        await UsersService.getSuggestedUsersList(setListUsersSuggested);
    };

    const handleMouseEnter = (id) => {
        setVisibleVideoId(id);
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
                            <ObService
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
                    <div className={cx('wrapper-item')}>
                        {listUsersSuggested && listUsersSuggested.length > 0 ? (
                            listUsersSuggested.map((item, index) => {
                                return (
                                    <div
                                        className={cx('items')}
                                        key={index}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                    >
                                        <BoxItem
                                            src={item.popular_video.file_url}
                                            avatar={item.avatar}
                                            labelUsername={`${item.first_name}${item.last_name}`}
                                            labelNickname={item.nickname}
                                            isCheck={item.tick}
                                            visible={visibleVideoId === item.id}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <BoxItem hiddenAvatar />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Following;
