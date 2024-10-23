import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostComment.module.scss';
import { AConIcon, Icon } from '~/components/Icons';
import * as CommentService from '~/services/CommentService';

const cx = classNames.bind(styles);
const PostComment = ({ idVideo, setDataComment, setTotalComment }) => {
    const [comment, setComment] = useState('');
    const ipRef = useRef();

    const handleClickPost = async () => {
        try {
            const result = await CommentService.postComment(idVideo, comment);
            if (result && result.data) {
                setComment('');
                setDataComment((prev) => [result.data, ...prev]);
                setTotalComment((prev) => (prev >= 0 ? prev + 1 : 0));
            }
        } catch (error) {
            console.log('failed post a comment', error);
        }
    };

    const handleOnKey = (e) => {
        if (e.keyCode === 13) {
            handleClickPost();
            ipRef.current.focus();
        }
    };
    return (
        <div className={cx('box-footer')}>
            <div className={cx('box-input')}>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={cx('input-add')}
                    placeholder="Add comment ..."
                    type="text"
                    ref={ipRef}
                    onKeyDown={handleOnKey}
                />
                <AConIcon />
                <Icon />
            </div>
            <div className={cx('title')} onClick={handleClickPost}>
                Post
            </div>
        </div>
    );
};

export default React.memo(PostComment);
