import classNames from 'classnames/bind';
import styles from './SelectDays.module.scss';
import SelectMethod from '../SelectMethod';

const cx = classNames.bind(styles);

const SelectDays = () => {
    const DATA_DAY = Array.from({ length: 31 }, (_, index) => index + 1);

    return (
        <SelectMethod>
            <div className={cx('wrapper')}>
                {DATA_DAY.map((day, index) => (
                    <div className={cx('items')} key={index}>
                        {day}
                    </div>
                ))}
            </div>
        </SelectMethod>
    );
};

export default SelectDays;
