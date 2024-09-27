import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import Button from '~/components/Button';
import { FacebookIcon, GoogleIcon, KaKaoIcon, LineIcon, PersonIcon } from '~/components/Icons';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { ContextProvider } from '~/Context';
import { SIGN_UP } from '~/utils/contantValue';

const cx = classNames.bind(styles);

const DATA_ITEMS_SIGN = [
    { title: 'Use phone / email / username', icon: <PersonIcon />, isClick: true },
    { title: 'Continue with Facebook', icon: <FacebookIcon /> },
    { title: 'Continue with Google', icon: <GoogleIcon /> },
    { title: 'Continue with Line', icon: <LineIcon /> },
    { title: 'Continue with KakaoTalk', icon: <KaKaoIcon /> },
];

const Signup = () => {
    const { setTypeModal, setIsCheckCss } = useContext(ContextProvider);

    const handleClick = (click) => {
        if (click === true) {
            setTypeModal(SIGN_UP);
            setIsCheckCss(false);
        } else {
            setTypeModal('');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign up | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {DATA_ITEMS_SIGN.map((item, index) => (
                <Button
                    key={index}
                    modalIcon
                    className={cx('bt-modal')}
                    modal
                    leftIcon={item.icon}
                    onClick={() => handleClick(item.isClick)}
                >
                    {item.title}
                </Button>
            ))}
        </div>
    );
};

export default Signup;
