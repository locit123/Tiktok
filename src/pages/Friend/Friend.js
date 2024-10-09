import { VideoObService } from '~/components/Box';
import classNames from 'classnames/bind';
import styles from './Friend.module.scss';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

const Friend = () => {
    const wrapperRef = useRef(null);
    const [listUsersSuggested, setListUsersSuggested] = useState([]);
    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <VideoObService listUsersSuggested={listUsersSuggested} setListUsersSuggested={setListUsersSuggested} />
        </div>
    );
};

export default Friend;
