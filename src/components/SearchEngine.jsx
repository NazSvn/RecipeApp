import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { GlobalContext } from '../context/GlobalContext'; 
import useFetch from '../hooks/useFetch';

const CACHE_AGE_LIMIT = 60 * 60 * 1000;

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [cachedData, setCachedData] = useState({});

  const { setRecipeList } = useContext(GlobalContext);

  const inputRef = useRef();

  const { fetchedData, loading, error } = useFetch(
    query
      ? `https://api.spoonacular.com/recipes/complexSearch?apiKey=&query=${query}&number=20`
      : null
  );

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeys = (e) => {
    switch (e.key) {
      case 'Enter':
        checkCache(inputValue);
        setInputValue('');
        inputRef.current.blur();
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
    (recipe) => {
      if (!recipe) return null;

      const cacheKey = recipe.toLocaleLowerCase().trim();
      const cachedResult = cachedData[cacheKey];

      if (cachedResult) {
        const cacheAge = Date.now() - cachedResult.timestamp;

        if (cacheAge < CACHE_AGE_LIMIT) {
          setRecipeList(cachedResult.data);
          return true;
        }
      }

      setQuery(recipe); // Trigger a new fetch if not in cache
      return false;
    },
    [cachedData, setRecipeList]
  );

  useEffect(() => {
    if (!fetchedData) return;

    const cacheKey = query.toLocaleLowerCase().trim();

    setCachedData((prev) => ({
      ...prev,
      [cacheKey]: {
        data: fetchedData,
        timestamp: Date.now(),
      },
    }));
    setRecipeList(fetchedData);
  }, [fetchedData, query, setRecipeList]);

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
        className='p-2 rounded-md w-96 shadow-sm '
      />
    </>
  );
};

export default SearchEngine;
