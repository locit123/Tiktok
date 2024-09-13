import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';
const Image = forwardRef(({ className, src, alt, fallback: customerFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customerFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            {...props}
            alt={alt}
            src={fallback || src}
            onError={handleError}
        />
    );
});

export default Image;
