import classNames from 'classnames/bind';
import Input from '~/components/Input';
import styles from './MethodSignup.module.scss';
import Select from '~/components/Select';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const MethodSignup = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-title')}>When’s your birthday?</div>
                <div className={cx('header-body')}>
                    <Select label={'Month'} />
                    <Select label={'Day'} />
                    <Select label={'Year'} />
                </div>
                <div className={cx('header-footer')}>Your birthday won't be shown publicly.</div>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-header')}>
                    <div className={cx('title-header')}>Email</div>
                    <Link className={cx('title-link')}>Sign up with phone</Link>
                </div>
                <div className={cx('body-input')}>
                    <Input placeholder={'Email address'} />
                    <Input icon placeholder={'Password'} />
                    <Input sendCode placeholder={'Enter 6-digit code'} />
                </div>
                <div className={cx('footer-checkbox')}>
                    <label className={cx('box-icon')}>
                        <FontAwesomeIcon icon={faSquareCheck} className={cx('icon')} />
                    </label>
                    <label className={cx('label')}>
                        Get trending content, newsletters, promotions, recommendations, and account updates sent to your
                        email
                    </label>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button large className={cx('btn-footer')}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default MethodSignup;
