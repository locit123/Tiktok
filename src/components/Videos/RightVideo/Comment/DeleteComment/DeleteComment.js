import Tippy from '@tippyjs/react/headless';
import { DeleteIcon, ReportIcon, TridentHorizontal } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './DeleteComment.module.scss';

const cx = classNames.bind(styles);

const DeleteComment = ({ visible, handleClickOutSide, idUser, handleClickToggle, handleClickDelete }) => {
    return (
        <div className={cx('box-hover')}>
            <Tippy
                touch={false}
                visible={visible}
                placement="bottom"
                trigger="click"
                interactive
                offset={[1000, 0]}
                animation="fade"
                hideOnClick
                onClickOutside={handleClickOutSide}
                render={() =>
                    visible && (
                        <div className={cx('box-content-tippy')}>
                            {idUser === 6947 ? (
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
                    )
                }
            >
                <div onClick={handleClickToggle}>
                    <TridentHorizontal className={cx('icon')} />
                </div>
            </Tippy>
        </div>
    );
};

export default DeleteComment;
