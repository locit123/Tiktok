import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import classNames from 'classnames/bind';
import AccountItem from './AccountItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

const SuggestedAccounts = ({ label, data }) => {
    const [clickSee, setClickSee] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('label')}>{label}</h2>
            {data && data.length ? data.map((item, index) => <AccountItem data={item} key={index} />) : <></>}
            <p className={cx('see-more')} onClick={() => setClickSee(!clickSee)}>
                {clickSee ? 'See Less' : 'See More'}
            </p>
        </div>
    );
};

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default SuggestedAccounts;
