import React, { useEffect, useRef, useState } from 'react';
import BoxItem from './BoxItem';
import classNames from 'classnames/bind';
import styles from './BoxItem.module.scss';
import * as UsersService from '~/services/UsersService';
const cx = classNames.bind(styles);
const VideoObService = () => {
    const [listUsersSuggested, setListUsersSuggested] = useState([]);
    const [visibleVideoId, setVisibleVideoId] = useState(null);

    useEffect(() => {
        getApiUsers();
    }, []);

    const getApiUsers = async () => {
        await UsersService.getSuggestedUsersList(setListUsersSuggested);
    };

    const handleMouseEnter = (id) => {
        setVisibleVideoId(id);
    };
    return (
        <div className={cx('wrapper-item')}>
            {listUsersSuggested && listUsersSuggested.length > 0 ? (
                listUsersSuggested.map((item, index) => {
                    return (
                        <div className={cx('items')} key={index} onMouseEnter={() => handleMouseEnter(item.id)}>
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
    );
};

export default VideoObService;
