import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BoxItem from './BoxItem';
import classNames from 'classnames/bind';
import styles from './BoxItem.module.scss';
import * as UsersService from '~/services/UsersService';
import * as FollowService from '~/services/FollowService';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const VideoObService = ({ listUsersSuggested, setListUsersSuggested }) => {
    const [visibleVideoId, setVisibleVideoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const divRef = useRef();
    const getApiUsers = useCallback(async () => {
        await UsersService.getSuggestedUsersList(1, 10);
    }, []);

    useEffect(() => {
        getApiUsers();
    }, [getApiUsers]);

    const dataStorage = useMemo(() => {
        return listUsersSuggested.map((User) => ({ ...User }));
    }, [listUsersSuggested]);

    const handleMouseEnter = (id) => {
        setVisibleVideoId(id);
    };

    const handleClickFollow = useCallback(
        async (e, id, follow) => {
            e.stopPropagation();
            if (!follow) {
                await FollowService.FollowAUser(id);
            } else {
                await FollowService.UnFollow(id);
            }
            await getApiUsers();
        },
        [getApiUsers],
    );

    const handleClickItem = (nickName) => {
        navigate(`/@${nickName}`);
    };
    return (
        <div className={cx('wrapper-item')} ref={divRef}>
            {dataStorage && dataStorage.length > 0 ? (
                dataStorage.map((item, index) => {
                    return (
                        <div className={cx('items')} key={index} onMouseEnter={() => handleMouseEnter(item.id)}>
                            <BoxItem
                                src={item.popular_video.file_url}
                                avatar={item.avatar}
                                labelUsername={`${item.first_name}${item.last_name}`}
                                labelNickname={item.nickname}
                                isCheck={item.tick}
                                visible={visibleVideoId === item.id}
                                handleClickFollow={(e) => handleClickFollow(e, item.id, item.is_followed)}
                                isFollow={item.is_followed}
                                handleClickItem={() => handleClickItem(item.nickname)}
                            />
                        </div>
                    );
                })
            ) : (
                <div>No Friends</div>
            )}
            {loading && <div className={cx('loading-ne')}>Loading...</div>}
        </div>
    );
};

export default React.memo(VideoObService);
