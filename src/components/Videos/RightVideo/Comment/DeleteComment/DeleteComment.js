import Tippy from '@tippyjs/react/headless';
import { DeleteIcon, ReportIcon, TridentHorizontal } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './DeleteComment.module.scss';
import React, { useContext } from 'react';
import { ContextProvider } from '~/Context';

const cx = classNames.bind(styles);

const DeleteComment = ({ visible, handleClickOutSide, idUser, handleClickToggle, handleClickDelete, setVisible }) => {
    const { dataCurrentUser } = useContext(ContextProvider);
    return (
        <div className={cx('box-hover')}>
            <Tippy
                touch={false}
                visible={visible}
                placement="bottom"
                interactive
                offset={[1000, 0]}
                animation="fade"
                onClickOutside={handleClickOutSide}
                onHide={() => {
                    setVisible(false);
                }}
                render={(attrs) => (
                    <div className={cx('box-content-tippy')} {...attrs}>
                        {visible && idUser === dataCurrentUser.id ? (
                            <div className={cx('box-delete')} onClick={handleClickDelete}>
                                <DeleteIcon />
                                <span>Delete</span>
                            </div>
                        ) : (
                            <>
                                <ReportIcon /> <span>Report</span>
                            </>
                        )}
                    </div>
                )}
            >
                <div onClick={handleClickToggle}>
                    <TridentHorizontal className={cx('icon')} />
                </div>
            </Tippy>
        </div>
    );
};

export default React.memo(DeleteComment);
