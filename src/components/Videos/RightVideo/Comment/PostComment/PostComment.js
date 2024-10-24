import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostComment.module.scss';
import { AConIcon, Icon } from '~/components/Icons';
import * as CommentService from '~/services/CommentService';
import { ContextProvider } from '~/Context';
import { TypeContextProvider } from '~/Context/ContextTypeStatus/ContextTypeStatus';
import { COMMENT_POST_FAILED, COMMENT_POST_SUCCESS } from '~/utils/contantValue';
import ModalNotification from '~/components/Notification';

const cx = classNames.bind(styles);
const PostComment = ({ idVideo, setDataComment, setTotalComment }) => {
    const { isOpenModalNotification, setIsOpenModalNotification } = useContext(ContextProvider);
    const { typeStatus, setTypeStatus } = useContext(TypeContextProvider);
    const [comment, setComment] = useState('');
    const ipRef = useRef();

    const handleClickPost = async () => {
        try {
            const result = await CommentService.postComment(idVideo, comment);
            if (result && result.data) {
                setTypeStatus(COMMENT_POST_SUCCESS);
                setComment('');
                setDataComment((prev) => [result.data, ...prev]);
                setTotalComment((prev) => (prev >= 0 ? prev + 1 : 0));
            }
        } catch (error) {
            setTypeStatus(COMMENT_POST_FAILED);
            console.log('failed post a comment', error);
        }
    };

    const handleOnKey = (e) => {
        if (e.keyCode === 13) {
            handleClickPost();
            ipRef.current.focus();
        }
    };

    useEffect(() => {
        let time;
        if (typeStatus === COMMENT_POST_SUCCESS) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        } else if (typeStatus === COMMENT_POST_FAILED) {
            setIsOpenModalNotification(true);
            time = setTimeout(() => {
                setIsOpenModalNotification(false);
                setTypeStatus(null);
            }, 1000);
        }

        return () => {
            clearTimeout(time);
        };
    }, [setIsOpenModalNotification, typeStatus, setTypeStatus]);
    return (
        <div className={cx('box-footer')}>
            {typeStatus === COMMENT_POST_SUCCESS || typeStatus === COMMENT_POST_FAILED ? (
                <ModalNotification
                    modalIsOpen={isOpenModalNotification}
                    setIsOpen={setIsOpenModalNotification}
                    text={typeStatus === COMMENT_POST_SUCCESS ? COMMENT_POST_SUCCESS : COMMENT_POST_FAILED}
                />
            ) : (
                <></>
            )}
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
