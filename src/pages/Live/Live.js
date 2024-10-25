import classNames from 'classnames/bind';
import styles from './Live.module.scss';
import { Helmet } from 'react-helmet';
const cx = classNames.bind(styles);
const Live = () => {
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>For You - TikTok LIVE feed</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            live
        </div>
    );
};

export default Live;
