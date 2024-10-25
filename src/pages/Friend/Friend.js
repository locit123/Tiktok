import classNames from 'classnames/bind';
import styles from './Friend.module.scss';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as UserService from '~/services/UsersService';
import * as FollowService from '~/services/FollowService';
import BoxItem from '~/components/Box/BoxItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { ContextProvider } from '~/Context';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const Friend = () => {
    const wrapperRef = useRef(null);
    const [listUsersSuggested, setListUsersSuggested] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const { token, setTypeModal, setIsShow } = useContext(ContextProvider);

    let navigate = useNavigate();

    useEffect(() => {
        const fetchApiGetUsers = async () => {
            try {
                setLoading(true);
                const result = await UserService.getSuggestedUsersList(page, 10);
                if (result && result.data) {
                    setLoading(false);
                    setCurrentPage(result.meta.pagination.current_page);
                    setTotalPage(result.meta.pagination.total_pages);
                    if (page > 1) {
                        setListUsersSuggested((prevUser) => [...prevUser, ...result.data]);
                    } else {
                        setListUsersSuggested(result.data);
                    }
                }
            } catch (error) {
                setLoading(false);
                console.log('fail api get users', error);
            } finally {
                setLoadingPage(false);
            }
        };
        fetchApiGetUsers();
    }, [page]);

    let currentListUsersSuggested = useMemo(() => {
        return listUsersSuggested && listUsersSuggested.length > 0 && listUsersSuggested.map((user) => ({ ...user }));
    }, [listUsersSuggested]);
    console.log(currentListUsersSuggested, 'currentListUsersSuggested');
    const handleMouseEnter = (id) => {
        setIdUser(id);
    };

    //FOLLOW
    const handleClickFollow = async (e, id, follow) => {
        e.stopPropagation();
        if (token) {
            if (follow) {
                await FollowService.UnFollow(id);
                setListUsersSuggested((prevUser) =>
                    prevUser.map((user) => (user.id === id ? { ...user, is_followed: !follow } : user)),
                );
            } else {
                await FollowService.FollowAUser(id);
                setListUsersSuggested((prevUser) =>
                    prevUser.map((user) => (user.id === id ? { ...user, is_followed: !follow } : user)),
                );
            }
        } else {
            setTypeModal('');
            setIsShow(true);
        }
    };
    //CLICK ITEM
    const handleClickItem = (nickname) => {
        navigate(`/@${nickname}`);
    };
    //SCROLL

    useEffect(() => {
        let currentRef = wrapperRef.current;
        const handleScroll = () => {
            let scrollTop = Math.round(currentRef.scrollTop + currentRef.clientHeight);
            let scrollHeight = currentRef.scrollHeight;

            if (scrollTop > scrollHeight) {
                if (currentPage < totalPage && !loadingPage) {
                    setLoadingPage(true);
                    setPage((prev) => prev + 1);
                }
            }
        };
        currentRef.addEventListener('scroll', handleScroll);
        return () => {
            currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, totalPage, loadingPage]);
    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>TikTok - Make Your Day</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className={cx('wrapper-box')}>
                {currentListUsersSuggested && currentListUsersSuggested.length > 0 ? (
                    currentListUsersSuggested.map((user, index) => (
                        <div key={index} onMouseEnter={() => handleMouseEnter(user.id)}>
                            <BoxItem
                                data={user}
                                visible={user.id === idUser}
                                handleClickFollow={(e) => handleClickFollow(e, user.id, user.is_followed)}
                                handleClickItem={() => handleClickItem(user.nickname)}
                            />
                        </div>
                    ))
                ) : (
                    <div>No Users</div>
                )}
            </div>
            {loading && (
                <div className={cx('box-loading')}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                </div>
            )}
        </div>
    );
};

export default Friend;
