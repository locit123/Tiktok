import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        let trigger = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(trigger);
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
