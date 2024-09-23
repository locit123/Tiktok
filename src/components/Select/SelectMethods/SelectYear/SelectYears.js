import classNames from 'classnames/bind';
import styles from './SelectYears.module.scss';
import SelectMethod from '../SelectMethod';

const cx = classNames.bind(styles);

const DATA_YEAR = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].reverse();

const SelectYears = () => {
    return (
        <SelectMethod>
            <div className={cx('wrapper')}>
                {DATA_YEAR.map((year, index) => (
                    <div className={cx('items')} key={index}>
                        {year}
                    </div>
                ))}
            </div>
        </SelectMethod>
    );
};

export default SelectYears;
