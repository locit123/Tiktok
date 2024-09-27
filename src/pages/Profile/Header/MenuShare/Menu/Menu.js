import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Menu = ({ DATA_BUTTON_MORE, listHistory, setListHistory }) => {
    const [visible, setVisible] = useState(false);

    const handleClickMore = (item, index) => {
        if (item.title === null) {
            setListHistory((prev) =>
                prev.map((item, prevIndex) =>
                    index === prevIndex ? { ...item, click: !item.click, hide: !item.hide } : { ...item },
                ),
            );
        }
    };

    useEffect(() => {
        let visible = false;
        for (let i = 0; i < listHistory.length; i++) {
            if (listHistory[i].click) {
                visible = listHistory[i].click;
            }
        }
        setVisible(visible);
    }, [listHistory, DATA_BUTTON_MORE, setListHistory]);
    useEffect(() => {
        if (visible && DATA_BUTTON_MORE) {
            setListHistory((prev) => {
                let prevMore =
                    JSON.stringify(prev.slice(-DATA_BUTTON_MORE.length)) !== JSON.stringify(DATA_BUTTON_MORE);
                if (prevMore) {
                    return [...prev, ...DATA_BUTTON_MORE];
                }
                return prev;
            });
        }
    }, [DATA_BUTTON_MORE, setListHistory, visible]);

    return (
        <div className={cx('wrapper', { visible })}>
            {listHistory.map((item, index) => (
                <Button
                    key={index}
                    leftIcon={item.icon}
                    className={cx('item', { more: item.style, hide: item.hide })}
                    onClick={() => handleClickMore(item, index)}
                    shareMenu
                >
                    {item.title}
                </Button>
            ))}
        </div>
    );
};

export default Menu;
