import classNames from 'classnames/bind';
import styles from './TabVideo.module.scss';
import { QrIcon } from '~/components/Icons';
import TabWrapper from '~/components/TabWrapper';

const cx = classNames.bind(styles);
const TabVideo = () => {
    return (
        <div className={cx('wrapper')}>
            <TabWrapper>
                <div className={cx('no-video')}>
                    <div className={cx('icon')}>
                        <QrIcon />
                    </div>
                    <p className={cx('title')}>Upload your first video</p>
                    <p className={cx('label')}>Your videos will appear here</p>
                </div>
            </TabWrapper>
        </div>
    );
};

export default TabVideo;
