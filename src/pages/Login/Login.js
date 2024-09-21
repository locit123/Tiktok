import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Helmet } from 'react-helmet';
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    KaKaoIcon,
    LineIcon,
    PersonIcon,
    QRCodeIcon,
    TwIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);
const DATA_ITEMS = [
    { title: 'Use QR code', icon: <QRCodeIcon /> },
    { title: 'Use phone / email / username', icon: <PersonIcon /> },
    { title: 'Continue with Facebook', icon: <FacebookIcon /> },
    { title: 'Continue with Google', icon: <GoogleIcon /> },
    { title: 'Continue with Twitter', icon: <TwIcon /> },
    { title: 'Continue with Line', icon: <LineIcon /> },
    { title: 'Continue with KakaoTalk', icon: <KaKaoIcon /> },
    { title: 'Continue with Apple', icon: <AppleIcon /> },
];

const Login = () => {
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Log in | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {DATA_ITEMS.map((item, index) => (
                <Button key={index} modalIcon className={cx('bt-modal')} modal leftIcon={item.icon}>
                    {item.title}
                </Button>
            ))}
        </div>
    );
};

export default Login;
