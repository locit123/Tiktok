import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentFile.module.scss';
import Button from '~/components/Button';
import * as VideoService from '~/services/VideoService';
import { BODY, FEED, LEFT, PROFILE, PUBLIC, RIGHT, WEB_TV } from '~/utils/contantValue';
import SelectWatchVideo from './SelectWatchVideo';
import HeaderUpLoad from './HeaderUpLoad';
import DescriptionUpload from './DescriptionUpload/DescriptionUpload';
import EditCoverVideoUpload from './EditCoverVideoUpload';
import LocationUpload from './LocationUpload';
import WhenToPostUpload from './WhenToPostUpload';
import { Feed, Profile, WebTv } from './BoxRight';
import WrapperSmartphone from '~/components/WrapperSmartphone';
const cx = classNames.bind(styles);
const DATA = [
    { title: 'Ho Chi Minh City' },
    { title: 'Goc Tam Su' },
    { title: 'Trai Đom Dom' },
    { title: 'Thung Lung Tinh Yeu' },
    { title: 'Khach San Muong Thanh' },
    { title: 'Central Circus' },
    { title: 'Tiem Ky Gui Noi Buon' },
    { title: 'Nha Hang Diem G' },
    { title: 'Trai Sky' },
    { title: 'Ho Chi Minh City' },
    { title: 'Goc Tam Su' },
    { title: 'Trai Đom Dom' },
    { title: 'Thung Lung Tinh Yeu' },
    { title: 'Khach San Muong Thanh' },
    { title: 'Central Circus' },
    { title: 'Tiem Ky Gui Noi Buon' },
    { title: 'Nha Hang Diem G' },
    { title: 'Trai Sky' },
];
const ContentFile = ({ isUpLoading, fileInfo, uploadDuration, uploadStatus, progressBar, src, uploadFile }) => {
    const divRef = useRef(null);
    const [statusScroll, setStatusScroll] = useState(LEFT);
    const [slider, setSlider] = useState(false);
    const [loading, setLoading] = useState(true);
    const [seeMore, setSeeMore] = useState(false);
    const [typeTab, setTypeTab] = useState(FEED);
    const [description, setDescription] = useState('');
    const [nameMusic, setNameMusic] = useState('demo music');
    const [viewAble, setViewAble] = useState(PUBLIC);
    const [allows, setAllows] = useState(['comment']);
    let thumbnailTime = 5;

    useEffect(() => {
        if (fileInfo && fileInfo.name) {
            setDescription(fileInfo.name);
        }
    }, [fileInfo]);

    const handleClickScroll = (e, type) => {
        let rect = divRef.current.getBoundingClientRect();
        let width = rect.width;
        if (type === RIGHT) {
            divRef.current.scrollBy({
                left: width,
                behavior: 'smooth',
            });
        } else {
            divRef.current.scrollBy({
                left: -width,
                behavior: 'smooth',
            });
        }
    };
    const handleScroll = () => {
        let Left = divRef.current.scrollLeft;
        let ClientWidth = divRef.current.clientWidth;
        let ScrollWidth = divRef.current.scrollWidth;

        if (Left === 0) {
            setStatusScroll(LEFT);
        } else if (Math.round(Left + ClientWidth) >= ScrollWidth - 2) {
            setStatusScroll(RIGHT);
        } else {
            setStatusScroll(BODY);
        }
    };
    useEffect(() => {
        let currentRef = divRef.current;
        currentRef.addEventListener('scroll', handleScroll);
        return () => {
            currentRef.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleClickSlider = () => {
        setSlider((prev) => !prev);
    };

    useEffect(() => {
        if (slider) {
            setLoading(true);
            let timeOut = setTimeout(() => {
                setLoading(false);
            }, 1000);
            return () => clearTimeout(timeOut);
        }
    }, [slider]);

    const handleClickSeeMore = () => {
        setSeeMore((prev) => !prev);
    };
    const handleClickTab = (type) => {
        setTypeTab(type);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setAllows([...allows, name]);
        } else {
            setAllows(allows.filter((itemName) => itemName !== name));
        }
    };

    const handleClickPost = async () => {
        const formatData = new FormData();
        formatData.append('description', description);
        formatData.append('upload_file', uploadFile);
        formatData.append('thumbnail_time', thumbnailTime);
        formatData.append('music', nameMusic);
        formatData.append('viewable', viewAble);
        allows.forEach((allow) => {
            formatData.append('allows[]', allow);
        });

        await VideoService.postAVideo(formatData);
    };
    return (
        <div className={cx('wrapper')}>
            <HeaderUpLoad
                fileInfo={fileInfo}
                progressBar={progressBar}
                uploadDuration={uploadDuration}
                uploadStatus={uploadStatus}
            />
            <div className={cx('box-footer')}>
                <div className={cx('box-footer-left')}>
                    <DescriptionUpload value={description} onChange={handleChangeDescription} />
                    <div className={cx('box-music')}>
                        <div className={cx('text-cover')}>Name music</div>
                        <input
                            type="text"
                            placeholder="name music..."
                            value={nameMusic}
                            onChange={(e) => setNameMusic(e.target.value)}
                            className={cx('description-music')}
                        />
                    </div>
                    <EditCoverVideoUpload src={src} isUpLoading={isUpLoading} />
                    <LocationUpload
                        DATA={DATA}
                        LEFT={LEFT}
                        RIGHT={RIGHT}
                        divRef={divRef}
                        handleClickScroll={handleClickScroll}
                        statusScroll={statusScroll}
                    />
                    <div className={cx('box-this-video')}>
                        <span className={cx('text-cover')}>Who can watch this video</span>
                        <SelectWatchVideo setViewAble={setViewAble} viewAble={viewAble} />
                    </div>
                    <WhenToPostUpload
                        handleClickSeeMore={handleClickSeeMore}
                        handleClickSlider={handleClickSlider}
                        loading={loading}
                        seeMore={seeMore}
                        slider={slider}
                        handleChangeCheckbox={handleChangeCheckbox}
                        allows={allows}
                    />
                </div>
                <div className={cx('box-right')}>
                    <div className={cx('box-right-top')}>
                        <div
                            className={cx('text-top-title', { isTab: typeTab === FEED })}
                            onClick={() => handleClickTab(FEED)}
                        >
                            Feed
                        </div>
                        <div
                            className={cx('text-top-title', { isTab: typeTab === PROFILE })}
                            onClick={() => handleClickTab(PROFILE)}
                        >
                            Profile
                        </div>
                        <div
                            className={cx('text-top-title', { isTab: typeTab === WEB_TV })}
                            onClick={() => handleClickTab(WEB_TV)}
                        >
                            Web/TV
                        </div>
                    </div>
                    {typeTab === FEED ? (
                        <WrapperSmartphone>
                            <Feed
                                src={src}
                                fileInfo={fileInfo}
                                description={description}
                                nameMusic={nameMusic}
                                isUpLoading={isUpLoading}
                            />
                        </WrapperSmartphone>
                    ) : typeTab === PROFILE ? (
                        <WrapperSmartphone>
                            <Profile src={src} />
                        </WrapperSmartphone>
                    ) : typeTab === WEB_TV ? (
                        <WrapperSmartphone>
                            <WebTv src={src} fileInfo={fileInfo} />
                        </WrapperSmartphone>
                    ) : (
                        typeTab === FEED
                    )}
                </div>
            </div>
            <div className={cx('box-bt')}>
                <Button primary className={cx('bt')} onClick={handleClickPost}>
                    Post
                </Button>
                <Button className={cx('bt', 'bt-2')}>Discard</Button>
            </div>
        </div>
    );
};

export default ContentFile;
