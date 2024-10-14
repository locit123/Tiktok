import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { IconBase64, UploadIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const DATA = [
    {
        icon: IconBase64.CameraIcon,
        title: 'Size and duration',
        label: 'Maximum size: 10 GB, video duration: 60 minutes.',
    },
    {
        icon: IconBase64.FileYoutubeIcon,
        title: 'File formats',
        label: 'Recommended: “.mp4”. Other major formats are supported.',
    },
    {
        icon: IconBase64.QualityIcon,
        title: 'Video resolutions',
        label: 'Minimum resolution: 720p. 2K and 4K are supported.',
    },
    {
        icon: IconBase64.CutIcon,
        title: 'Aspect ratios',
        label: 'Recommended: 16:9 for landscape, 9:16 for vertical.',
    },
];
const Upload = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box-upload')}>
                <div className={cx('box-header')}>
                    <input type="file" hidden id="id-input" />
                    <label htmlFor="id-input" className={cx('upload')}>
                        <div className={cx('content-upload')}>
                            <UploadIcon />
                            <div className={cx('title')}>Select video to upload</div>
                            <div className={cx('description')}>Or drag and drop it here</div>
                            <label htmlFor="id-input" className={cx('bt')} primary>
                                Select video
                            </label>
                        </div>
                    </label>
                </div>
                <div className={cx('box-footer')}>
                    {DATA.map((item, index) => {
                        return (
                            <div key={index} className={cx('box-content')}>
                                <img src={item.icon} alt={index} />
                                <div className={cx('box-title')}>
                                    <div className={cx('title-footer')}>{item.title}</div>
                                    <div className={cx('label-footer')}>{item.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Upload;
