import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import SelectFile from './SelectFile';
import { useState } from 'react';
import ContentFile from './ContentFile';

const cx = classNames.bind(styles);

const Upload = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [progressBar, setProgressBar] = useState(0);
    const [fileInfo, setFileInfo] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUpLoading, setIsUpLoading] = useState(false);
    const [uploadDuration, setUploadDuration] = useState(null);
    const [uploadFile, setUploadFile] = useState('');
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file) {
            setUploadFile(file);
            setFileInfo({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1), //convert MB
            });

            let urlVideo = URL.createObjectURL(file);

            //start loading
            setIsUpLoading(true);
            setProgressBar(0);
            setUploadDuration(null);
            const startTime = Date.now(); //time start

            let fakeProgressBar = setInterval(() => {
                setProgressBar((prev) => {
                    if (prev >= 100) {
                        clearInterval(fakeProgressBar);
                        setUploadStatus('Uploaded');
                        setIsUpLoading(false);
                        const endTime = Date.now(); //time end
                        const duration = ((endTime - startTime) / 1000).toFixed(1); //tinh toan time
                        setUploadDuration(duration);
                        setVideoFile(urlVideo);
                        return 100;
                    }
                    return prev + 15;
                });
            }, 200);
        }
    };
    return (
        <div className={cx('wrapper')}>
            {fileInfo ? (
                <div className={cx('box-content')}>
                    <ContentFile
                        fileInfo={fileInfo}
                        progressBar={progressBar}
                        uploadDuration={uploadDuration}
                        uploadStatus={uploadStatus}
                        src={videoFile}
                        uploadFile={uploadFile}
                        isUpLoading={isUpLoading}
                    />
                </div>
            ) : (
                <SelectFile onChange={handleChangeFile} />
            )}
        </div>
    );
};

export default Upload;
