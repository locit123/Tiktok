// import PropsTypes from 'prop-types';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const Button = ({
    to,
    href,
    to2,
    text = false,
    primary = false,
    outline = false,
    small = false,
    large = false,
    disable = false,
    rounded = false,
    outlineHeader = false,
    modal = false,
    modalIcon = false,
    noToken = false,
    sizeIcon = false,
    shareMenu = false,
    className,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) => {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    //remove event startWith ""on"" is disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
        modal,
        outlineHeader,
        noToken,
        [className]: className,
        sizeIcon,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && (
                <span
                    className={cx('icon', {
                        modalIcon,
                        sizeIcon,
                        shareMenu,
                    })}
                >
                    {leftIcon}
                </span>
            )}
            <span className={cx('title')}>{children}</span>
            {modal && <span className={cx('modal-sp')}></span>}
        </Comp>
    );
};

// Button.propTypes = {
//     to: PropsTypes.string,
//     href: PropsTypes.string,
//     text: PropsTypes.bool,
//     primary: PropsTypes.bool,
//     outline: PropsTypes.bool,
//     small: PropsTypes.bool,
//     large: PropsTypes.bool,
//     disable: PropsTypes.bool,
//     rounded: PropsTypes.bool,
//     modal: PropsTypes.bool,
//     outlineHeader: PropsTypes.bool,
//     className: PropsTypes.string,
//     leftIcon: PropsTypes.node,
//     rightIcon: PropsTypes.node,
//     children: PropsTypes.node.isRequired,
//     onClick: PropsTypes.func,
// };

export default Button;
