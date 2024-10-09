import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import BoxLeft from './BoxLeft';
import PostComment from '~/components/Videos/RightVideo/Comment/PostComment';

const cx = classNames.bind(styles);
const Video = ({ type }) => {
    return (
        <div className={cx('wrapper')}>
            <BoxLeft type={type} />
            <div className={cx('wrapper-right')}>
                <div className={cx('box-top')}></div>
                <div className={cx('box-bottom')}>
                    <PostComment />
                </div>
            </div>
        </div>
    );
};

export default Video;
