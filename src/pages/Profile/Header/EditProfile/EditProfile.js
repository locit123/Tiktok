import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PromoteIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const EditProfile = ({ onClick }) => {
    return (
        <div className={cx('wrapper')}>
            <Button
                onClick={onClick}
                outline
                small
                className={cx('btn-edit')}
                leftIcon={<FontAwesomeIcon icon={faPenToSquare} className={cx('icon')} />}
            >
                Edit profile
            </Button>
            <Button outline small leftIcon={<PromoteIcon />} className={cx('btn-edit')}>
                Promote post
            </Button>
        </div>
    );
};

export default EditProfile;
