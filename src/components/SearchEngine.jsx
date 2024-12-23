import { useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import useCleanupCache from '../hooks/useCleanupCache';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { MIN_WINDOW_WIDTH } from '../services/minWidthLimit';

const SearchEngine = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const [cachedData, setCachedData] = useState(() => {
    const savedCache = localStorage.getItem('cachedRecipeList');
    return savedCache ? JSON.parse(savedCache) : {};
  });
  const [url, setUrl] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const {
    inputValue,
    setInputValue,
    setRecipeList,
    showingSearch,
    setShowingSearch,
    inputRef,
    toggleSearchRef,
  } = useContext(GlobalContext);

  const { fetchedData, loading, error } = useFetch(url);

  const cleanupCache = useCleanupCache();

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeys = (e) => {
    switch (e.key) {
      case 'Enter':
        checkCache(inputValue);
        setQuery(inputValue);
        setInputValue('');
        inputRef.current.blur();
        setShowingSearch(false);
        navigate('/searchResults');

        break;
      case 'Escape':
        setInputValue('');
        setShowingSearch(false);
        inputRef.current.blur();

        break;

      default:
        break;
    }
  };

  const checkCache = useCallback(
    (query) => {
      if (!query) return null;

      const cleanedCache = cleanupCache(cachedData);

      const cacheKey = query.toLocaleLowerCase().trim();
      const cachedResult = cleanedCache[cacheKey];

      if (cachedResult) {
        setRecipeList(cachedResult.data);
        setUrl(null);

        if (
          Object.keys(cleanedCache).length !== Object.keys(cachedData).length
        ) {
          setCachedData(cleanedCache);
          localStorage.setItem(
            'cachedRecipeList',
            JSON.stringify(cleanedCache),
          );
        }
      } else {
        setUrl(`/.netlify/functions/searchRecipes?query=${query}&number=18`);
      }
    },
    [cachedData, cleanupCache, setRecipeList],
  );

  useEffect(() => {
    if (fetchedData) {
      const cacheKey = query.toLocaleLowerCase().trim();

      const updateCache = {
        ...cachedData,
        [cacheKey]: {
          data: fetchedData,
          timestamp: Date.now(),
        },
      };
      setCachedData(updateCache);

      localStorage.setItem('cachedRecipeList', JSON.stringify(updateCache));

      setRecipeList(fetchedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= MIN_WINDOW_WIDTH) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    const handleClickOutside = (e) => {
      if (
        toggleSearchRef.current &&
        !toggleSearchRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowingSearch(false);
        setInputValue('');
        inputRef.current.blur();
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, setInputValue, setShowingSearch, toggleSearchRef]);

  const handleToggleSearch = useCallback(() => {
    if (inputValue === '' && !isOpen) {
      setShowingSearch((prev) => !prev);
    } else {
      if (inputValue === '' && isOpen) return;
      checkCache(inputValue);
      setQuery(inputValue);
      setInputValue('');
      inputRef.current.blur();
      setShowingSearch(false);
      navigate('/searchResults');
    }
  }, [
    checkCache,
    inputRef,
    inputValue,
    isOpen,
    navigate,
    setInputValue,
    setShowingSearch,
  ]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center text-white">
        <div className="bg-background rounded-lg border border-purple-light px-6 py-1">
          Loading recipe details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-lg bg-accent-red px-6 py-1 text-white">
          Error: {error}
        </div>
      </div>
    );

  return (
    <>
      <div className="flex content-center">
        <input
          type="text"
          name="search"
          value={inputValue}
          placeholder="Search Recipe"
          ref={inputRef}
          onChange={handleOnChange}
          onKeyDown={(e) => handleKeys(e)}
          aria-label="Search for recipes"
          className={`absolute left-[20%] rounded-sm bg-purple-light px-4 py-2 text-white outline-none transition-all duration-300 placeholder:text-white/70 focus:ring-2 focus:ring-accent-lime focus:ring-offset-2 focus:ring-offset-purple xs:pointer-events-auto xs:static xs:max-h-full xs:transform-none xs:bg-purple-light/10 xs:opacity-100 xs:hover:bg-purple-light/20 xs:focus:bg-purple-light/20 sm:w-96 ${
            showingSearch
              ? 'max-h-full translate-y-14 opacity-100'
              : 'max-h-0 -translate-y-4 opacity-0'
          } ${!showingSearch && !isOpen ? 'pointer-events-none' : 'pointer-events-auto'} `}
        />
        <button
          ref={toggleSearchRef}
          onClick={handleToggleSearch}
          className="px-2 text-xl transition-colors duration-300 hover:text-accent-lime"
          aria-label={showingSearch ? 'Close search' : 'Open search'}
        >
          <RxMagnifyingGlass className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default SearchEngine;
