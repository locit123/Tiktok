import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import { FAV, LAT, LIK, VID } from '~/utils/contantValue';
import { Favorites, Likes, Videos } from './Tab';

const cx = classNames.bind(styles);

const Profile = () => {
    const [typeTab, setTypeTab] = useState(VID);
    const [typeTabHover, setTypeTabHover] = useState();
    const [typeButton, setTypeButton] = useState(LAT);
    const [historyTab, setHistoryTab] = useState(VID);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Header />
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
                        <Videos />
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
