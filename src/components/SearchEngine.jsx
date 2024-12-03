import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const CACHE_AGE_LIMIT = 60 * 60 * 1000;

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
        navigate('/');
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

      const cacheKey = query.toLocaleLowerCase().trim();
      const cachedResult = cachedData[cacheKey];

      if (cachedResult) {
        const cacheAge = Date.now() - cachedResult.timestamp;

        if (cacheAge < CACHE_AGE_LIMIT) {
          setRecipeList(cachedResult.data);
          setUrl(null);
          console.log('get from cache');
        }
      } else {
        setUrl(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=&query=${query}&number=20`
        );
        console.log('call api');
      }
    },
    [cachedData, setRecipeList]
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
      <div className='flex justify-center items-center h-screen text-2xl text-gray-600'>
        Loading recipe details...
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center h-screen text-2xl text-red-600'>
        Error: {error}
      </div>
    );

  return (
    <>
      <input
        type='text'
        name='search'
        value={inputValue}
        placeholder='Search Recipe'
        ref={inputRef}
        onChange={handleOnChange}
        onKeyDown={(e) => handleKeys(e)}
        aria-label='Search for recipes'
        className='p-2 rounded-md w-96 shadow-sm'
      />
    </>
  );
};

export default SearchEngine;
