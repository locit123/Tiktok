import classNames from 'classnames/bind';
import styles from './SelectMonths.module.scss';
import SelectMethod from '../SelectMethod';

const cx = classNames.bind(styles);

const DATA_MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const SelectMonths = () => {
    return (
        <SelectMethod>
            <div className={cx('wrapper')}>
                {DATA_MONTH.map((month, index) => (
                    <div className={cx('items')} key={index}>
                        {month}
                    </div>
                ))}
            </div>
        </SelectMethod>
    );
};

export default SelectMonths;
