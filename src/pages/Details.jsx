import { useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import useFetch from '../hooks/useFetch';
import useCleanupCache from '../hooks/useCleanupCache';
import { GlobalContext } from '../context/GlobalContext';

const Details = () => {
  const params = useParams();

  const {
    cachedDetails,
    setCachedDetails,
    detailsData,
    setDetailsData,
    url,
    setUrl,
  } = useContext(GlobalContext);

  const { fetchedData, loading, error } = useFetch(url);

  const cleanupCache = useCleanupCache();

  const checkCache = useCallback(() => {
    const recipeId = params.id;

    const cleanedCache = cleanupCache(cachedDetails);
    const cachedRecipe = cleanedCache[recipeId];

    if (cachedRecipe) {
      setDetailsData(cachedRecipe.data);
      setUrl(null);
    } else {
      setUrl(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=`,
      );
    }
  }, [cachedDetails, cleanupCache, params.id, setDetailsData, setUrl]);

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
  }, [cachedDetails, fetchedData, params.id, setCachedDetails, setDetailsData]);

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
      <div className="pt-24"></div>
      <RecipeDetails detailsData={detailsData} />
    </>
  );
};

export default Details;
