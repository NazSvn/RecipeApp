import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import useFetch from '../hooks/useFetch';

const CACHE_AGE_LIMIT = 60 * 60 * 1000;

const Details = () => {
  const params = useParams();

  const [cachedDetails, setCachedDetails] = useState(() => {
    const savedCache = localStorage.getItem('recipeCache');
    return savedCache ? JSON.parse(savedCache) : {};
  });
  const [detailsData, setDetailsData] = useState(null);
  const [url, setUrl] = useState(null);

  const { fetchedData, loading, error } = useFetch(url);

  const checkCache = useCallback(() => {
    const recipeId = params.id;
    const cachedRecipe = cachedDetails[recipeId];

    if (cachedRecipe) {
      const cacheAge = Date.now() - cachedRecipe.timestamp;
      if (cacheAge < CACHE_AGE_LIMIT) {
        setDetailsData(cachedRecipe.data);
        setUrl(null); 
      }
    } else {
      setUrl(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=`
      ); 
    }
  }, [cachedDetails, params.id]);

  useEffect(() => {
    checkCache();
  }, [checkCache]);

  useEffect(() => {
    if (fetchedData) {
      const recipeId = params.id;
      const updatedCache = {
        ...cachedDetails,
        [recipeId]: {
          data: fetchedData,
          timestamp: Date.now(),
        },
      };

      setCachedDetails(updatedCache);
      localStorage.setItem('recipeCache', JSON.stringify(updatedCache));
      setDetailsData(fetchedData);
    }
  }, [cachedDetails, fetchedData, params.id]);

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
      <div className='pt-24'></div>
      <RecipeDetails detailsData={detailsData} />      
    </>
  );
};

export default Details;
