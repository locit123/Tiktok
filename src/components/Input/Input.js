import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { EyeIcon } from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);
const Input = ({ placeholder, value, type, onChange, icon = false, sendCode = false }) => {
    return (
        <div className={cx('wrapper', { icon, sendCode })}>
            <input
                className={cx('input', { sendCode })}
                placeholder={placeholder}
                value={value}
                type={type}
                onChange={onChange}
            />
            {icon && (
                <span className={cx('icon-eye')}>
                    <EyeIcon />
                </span>
            )}
            {sendCode && (
                <Button large className={cx('btn-sendCode')}>
                    Send code
                </Button>
            )}
        </div>
    );
};

export default Input;
