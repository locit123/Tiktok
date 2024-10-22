import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './WhenToPostUpload.module.scss';
import { ArrowIcon, SupportIcon, TickIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COMMENT, DUET, NOW, SCHEDULE, STITCH } from '~/utils/contantValue';

const cx = classNames.bind(styles);
const WhenToPostUpload = ({
    slider,
    handleClickSlider,
    loading,
    handleClickSeeMore,
    seeMore,
    handleChangeCheckbox,
    allows,
}) => {
    const [isRadio, setIsRadio] = useState('now');

    const handleRadioChange = (e) => {
        setIsRadio(e.target.value);
    };

    return (
        <div className={cx('box-when-post')}>
            <span className={cx('text-cover', 'when-post')}>When to post</span>
            <div className={cx('box-radio')}>
                <label className={cx('label-ip')}>
                    <input
                        name="uploadTime"
                        type="radio"
                        value={NOW}
                        checked={isRadio === NOW}
                        onChange={handleRadioChange}
                    />
                    <div className={cx('custom-radio')}></div>
                    <span className={cx('title-radio')}>Now</span>
                </label>
                <label className={cx('label-ip')}>
                    <input
                        name="uploadTime"
                        type="radio"
                        value={SCHEDULE}
                        checked={isRadio === SCHEDULE}
                        onChange={handleRadioChange}
                    />
                    <div className={cx('custom-radio')}></div>
                    <div className={cx('box-schedule')}>
                        <span className={cx('title-radio')}>Schedule</span>
                        <SupportIcon />
                    </div>
                </label>
            </div>
            <div className={cx('run')}>
                <div className={cx('run-left')}>
                    <div>Run a coppyright check</div>
                    <SupportIcon />
                </div>
                <label className={cx('box-check-box')}>
                    <input type="checkbox" checked={slider} onChange={handleClickSlider} />
                    <div className={cx('slider')}></div>
                </label>
            </div>
            {slider && (
                <div className={cx('show-check')}>
                    {loading ? (
                        <FontAwesomeIcon icon={faSpinner} className={cx('ic-spinner')} />
                    ) : (
                        <TickIcon className={cx('tick-icon')} />
                    )}
                    <span className={cx('text-span-show')}>No issues detected.</span>
                </div>
            )}
            <div className={cx('see-more')}>
                <div className={cx('see-more-top')} onClick={handleClickSeeMore}>
                    <h3 className={cx('text-cover', 'text-see-more')}>{seeMore ? 'See less' : 'See more'}</h3>
                    <ArrowIcon width="1.6rem" height="1.6rem" className={cx({ showSeeMore: seeMore })} />
                </div>
                {!seeMore ? (
                    <span className={cx('text-see')}>Content disclosure and other advanced settings</span>
                ) : (
                    <div>
                        <div className={cx('see-less-top')}>
                            <h3 className={cx('see-less-one')}>Allow users to:</h3>
                            <div className={cx('see-less-checkbox')}>
                                <div className={cx('item-checkbox')}>
                                    <label className={cx('checkbox-one')}>
                                        <input
                                            onChange={handleChangeCheckbox}
                                            name={COMMENT}
                                            type="checkbox"
                                            className={cx('cb')}
                                            checked={allows.includes(COMMENT)}
                                        />
                                        <div className={cx('custom-checkbox')}>
                                            <TickIcon className={cx('icon-c')} />
                                        </div>
                                    </label>
                                    <span>Comment</span>
                                </div>
                                <div className={cx('item-checkbox')}>
                                    <label className={cx('checkbox-one')}>
                                        <input
                                            onChange={handleChangeCheckbox}
                                            name={DUET}
                                            type="checkbox"
                                            checked={allows.includes(DUET)}
                                            className={cx('cb')}
                                        />
                                        <div className={cx('custom-checkbox')}>
                                            <TickIcon className={cx('icon-c')} />
                                        </div>
                                    </label>
                                    <span>Duet</span>
                                </div>
                                <div className={cx('item-checkbox')}>
                                    <label className={cx('checkbox-one')}>
                                        <input
                                            onChange={handleChangeCheckbox}
                                            name={STITCH}
                                            type="checkbox"
                                            checked={allows.includes(STITCH)}
                                            className={cx('cb')}
                                        />
                                        <div className={cx('custom-checkbox', 'check-none')}>
                                            <TickIcon className={cx('icon-c')} />
                                        </div>
                                    </label>
                                    <span>Stitch</span>
                                </div>
                            </div>
                            <div className={cx('text-duet')}>Duet and Stitch not available for videos over 60s</div>
                            <div className={cx('run', 'mr-t')}>
                                <div className={cx('run-left')}>
                                    <div>Disclose post content</div>
                                    <SupportIcon />
                                </div>
                                <label className={cx('box-check-box')}>
                                    <input type="checkbox" checked={slider} onChange={handleClickSlider} />
                                    <div className={cx('slider')}></div>
                                </label>
                            </div>
                            <div className={cx('run', 'mr-t')}>
                                <div className={cx('run-left')}>
                                    <div>AI-generated content</div>
                                    <SupportIcon />
                                </div>
                                <label className={cx('box-check-box')}>
                                    <input type="checkbox" checked={slider} onChange={handleClickSlider} />
                                    <div className={cx('slider')}></div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhenToPostUpload;
