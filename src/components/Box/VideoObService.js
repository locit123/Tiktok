import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BoxItem from './BoxItem';
import classNames from 'classnames/bind';
import styles from './BoxItem.module.scss';
import * as UsersService from '~/services/UsersService';
const cx = classNames.bind(styles);
const VideoObService = ({ indexPage, listUsersSuggested, setListUsersSuggested, setTotalPage }) => {
    const [visibleVideoId, setVisibleVideoId] = useState(null);
    const [loading, setLoading] = useState(false);

    const divRef = useRef();
    const getApiUsers = useCallback(async () => {
        await UsersService.getSuggestedUsersList(indexPage, setListUsersSuggested, setLoading, setTotalPage);
    }, [setListUsersSuggested, indexPage, setTotalPage]);

    useEffect(() => {
        getApiUsers();
    }, [getApiUsers]);

    const dataStorage = useMemo(() => {
        return listUsersSuggested.map((User) => ({ ...User }));
    }, [listUsersSuggested]);
    console.log(dataStorage, 'dataStorage');

    const handleMouseEnter = (id) => {
        setVisibleVideoId(id);
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
                            />
                        </div>
                    );
                })
            ) : (
                <BoxItem hiddenAvatar />
            )}
            {loading && <div className={cx('loading-ne')}>Loading...</div>}
        </div>
    );
};

export default React.memo(VideoObService);
