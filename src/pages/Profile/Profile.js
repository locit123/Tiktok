import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Header from './Header';
import Footer from './Footer';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FAV, LAT, LIK, VID } from '~/utils/contantValue';
import { Favorites, Likes, Videos } from './Tab';
import { useLocation } from 'react-router';
import * as UserService from '~/services/UsersService';
import { Helmet } from 'react-helmet';
import { ContextProvider } from '~/Context';

const cx = classNames.bind(styles);

const Profile = () => {
    const { dataCurrentUser } = useContext(ContextProvider);
    console.log(dataCurrentUser, 'dataCurrentUser');

    const [typeTab, setTypeTab] = useState(VID);
    const [typeTabHover, setTypeTabHover] = useState();
    const [typeButton, setTypeButton] = useState(LAT);
    const [historyTab, setHistoryTab] = useState(VID);
    const [listDataAnUser, setListDataAnUser] = useState({});
    const location = useLocation();
    const { pathname } = location;

    const getApiAnUser = useCallback(async () => {
        if (pathname) {
            await UserService.getAnUser(pathname, setListDataAnUser);
        }
    }, [pathname]);

    useEffect(() => {
        getApiAnUser();
    }, [getApiAnUser]);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {dataCurrentUser.nickname}({`@${dataCurrentUser.first_name}${dataCurrentUser.last_name}`}) | TikTok
                </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <header className={cx('header')}>
                <Header
                    getApiAnUser={getApiAnUser}
                    listDataAnUser={listDataAnUser}
                    setListDataAnUser={setListDataAnUser}
                />
            </header>
            <footer className={cx('scroll-footer')}>
                <div className={cx('footer')}>
                    <Footer
                        typeTab={typeTab}
                        setTypeTab={setTypeTab}
                        typeButton={typeButton}
                        setTypeButton={setTypeButton}
                        typeTabHover={typeTabHover}
                        setTypeTabHover={setTypeTabHover}
                        historyTab={historyTab}
                        setHistoryTab={setHistoryTab}
                    />
                    {historyTab === VID ? (
                        <Videos listDataAnUser={listDataAnUser} />
                    ) : historyTab === FAV ? (
                        <Favorites />
                    ) : (
                        historyTab === LIK && <Likes />
                    )}
                </div>
            </footer>
        </div>
    );
};

export default Profile;
