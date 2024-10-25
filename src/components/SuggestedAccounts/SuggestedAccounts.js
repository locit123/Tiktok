import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import classNames from 'classnames/bind';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

const SuggestedAccounts = ({ label, data }) => {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('label')}>{label}</h2>
            <AccountItem />
            <AccountItem />
            <AccountItem />

            <p className={cx('see-more')}>See More</p>
        </div>
    );
};

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default SuggestedAccounts;
