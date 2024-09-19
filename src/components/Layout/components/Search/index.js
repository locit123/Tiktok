import { useEffect, useRef, useState } from 'react';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from '~/hooks';
import * as searchService from '~/apiService/SearchService';
const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef();

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setIsLoading(true);
            const result = await searchService.search(debounce);
            setSearchResult(result);
            setIsLoading(false);
        };
        fetchApi();
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleClickOut = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const search = e.target.value;
        if (!search.startsWith(' ')) {
            setSearchValue(search);
        }
    };

    return (
        //Using a wrapper <div> or <span> tag around the reference
        //element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex={'-1'} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult &&
                                searchResult.length > 0 &&
                                searchResult.map((item, index) => <AccountItem data={item} key={index} />)}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleClickOut}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !isLoading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
