import { useCallback, useEffect, useRef, useState } from 'react';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiUser } from '~/api/callApi';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef();

    const apiSearch = useCallback(async () => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        try {
            setIsLoading(true);
            const res = await apiUser.searchAccount(searchValue);
            if (res && res.data) {
                setIsLoading(false);

                setSearchResult(res.data);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }, [searchValue]);

    useEffect(() => {
        apiSearch();
    }, [apiSearch]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleClickOut = () => {
        setShowResult(false);
    };
    return (
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
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !isLoading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
