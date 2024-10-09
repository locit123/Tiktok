import classNames from 'classnames/bind';
import styles from './TabVideo.module.scss';
import { QrIcon } from '~/components/Icons';
import TabWrapper from '~/components/TabWrapper';
import ComponentVideo, { VideoProfile } from '~/components/TabVideo';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);
const TabVideo = ({ listDataAnUser }) => {
    const [visible, setVisible] = useState();
    const navigate = useNavigate();
    const listVideo = useMemo(() => {
        return listDataAnUser?.videos?.map((video) => ({ ...video }));
    }, [listDataAnUser]);
    console.log(listVideo, 'listVideo');

    const handleMouseEnter = (id) => {
        setVisible(id);
    };

    const handleClickVideo = (uuid) => {
        navigate(`video/${uuid}`);
    };
    return (
        <div className={cx('wrapper')}>
            {listVideo && listVideo.length > 0 ? (
                <ComponentVideo>
                    {listVideo.map((item, index) => {
                        return (
                            <VideoProfile
                                handleMouseEnter={() => handleMouseEnter(item.id)}
                                key={index}
                                src={item.file_url}
                                type={item.meta.mime_type}
                                viewsCount={item.views_count}
                                visible={visible === item.id}
                                handleClickVideo={() => handleClickVideo(item.uuid)}
                            />
                        );
                    })}
                </ComponentVideo>
            ) : (
                <TabWrapper>
                    <div className={cx('no-video')}>
                        <div className={cx('icon')}>
                            <QrIcon />
                        </div>
                        <p className={cx('title')}>Upload your first video</p>
                        <p className={cx('label')}>Your videos will appear here</p>
                    </div>
                </TabWrapper>
            )}
        </div>
    );
};

export default TabVideo;
