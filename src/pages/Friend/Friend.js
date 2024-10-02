import { VideoObService } from '~/components/Box';
import classNames from 'classnames/bind';
import styles from './Friend.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const Friend = () => {
    const wrapperRef = useRef(null);
    const [indexPage, setIndexPage] = useState(1);
    const [listUsersSuggested, setListUsersSuggested] = useState([]);

    useEffect(() => {
        let wrapper = wrapperRef.current;
        const handleScroll = () => {
            if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 5) {
                setIndexPage((prev) => prev + 1);
            }
        };
        wrapper.addEventListener('scroll', handleScroll);

        return () => {
            wrapper.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <VideoObService
                indexPage={indexPage}
                listUsersSuggested={listUsersSuggested}
                setListUsersSuggested={setListUsersSuggested}
            />
        </div>
    );
};

export default Friend;
