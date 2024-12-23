import { useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import useFetch from '../hooks/useFetch';
import useCleanupCache from '../hooks/useCleanupCache';
import { GlobalContext } from '../context/GlobalContext';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeDirections from '../components/RecipeDirections';

const Details = () => {
  const params = useParams();

  const {
    cachedDetails,
    setCachedDetails,
    detailsData,
    setDetailsData,
     
  } = useContext(GlobalContext);
const [url,
    setUrl] =useState(null)
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
      setUrl(`/.netlify/functions/searchDetails?recipeId=${recipeId}`);
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
      {detailsData && <RecipeDetails detailsData={detailsData} />}
      {detailsData && (
        <RecipeIngredients ingredients={detailsData?.extendedIngredients} />
      )}
      {detailsData && (
        <RecipeDirections directions={detailsData?.analyzedInstructions} />
      )}
    </>
  );
};

export default Details;
