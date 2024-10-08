import { VideoObService } from '~/components/Box';
import classNames from 'classnames/bind';
import styles from './Friend.module.scss';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

const cx = classNames.bind(styles);

const Friend = () => {
    const wrapperRef = useRef(null);
    const [indexPage, setIndexPage] = useState(1);
    const [listUsersSuggested, setListUsersSuggested] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        let wrapper = wrapperRef.current;
        const handleScroll = debounce(() => {
            if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 5) {
                if (indexPage < totalPage) {
                    setIndexPage((prev) => prev + 1);
                }
            }
        }, 500);
        wrapper.addEventListener('scroll', handleScroll);

        return () => {
            wrapper.removeEventListener('scroll', handleScroll);
        };
    }, [indexPage, totalPage]);
    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <VideoObService
                indexPage={indexPage}
                listUsersSuggested={listUsersSuggested}
                setListUsersSuggested={setListUsersSuggested}
                setTotalPage={setTotalPage}
            />
        </div>
    );
};

export default Friend;
