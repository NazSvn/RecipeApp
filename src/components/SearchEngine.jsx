import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import useCleanupCache from '../hooks/useCleanupCache';

const SearchEngine = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [cachedData, setCachedData] = useState(() => {
    const savedCache = localStorage.getItem('cachedRecipeList');
    return savedCache ? JSON.parse(savedCache) : {};
  });
  const [url, setUrl] = useState(null);

  const { setRecipeList } = useContext(GlobalContext);

  const inputRef = useRef();

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
        navigate('/searchResults');
        break;
      case 'Escape':
        setInputValue('');
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
        console.log('get from cache');

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
        setUrl(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=&query=${query}&number=20`,
        );
        console.log('call api');
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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-2xl text-gray-600">
        Loading recipe details...
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-2xl text-red-600">
        Error: {error}
      </div>
    );

  return (
    <>
      <input
        type="text"
        name="search"
        value={inputValue}
        placeholder="Search Recipe"
        ref={inputRef}
        onChange={handleOnChange}
        onKeyDown={(e) => handleKeys(e)}
        aria-label="Search for recipes"
        className="w-96 rounded-md p-2 shadow-sm"
      />
    </>
  );
};

export default SearchEngine;
