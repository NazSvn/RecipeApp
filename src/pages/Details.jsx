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

    if (cachedRecipe && Date.now - cachedRecipe.timestamp < CACHE_AGE_LIMIT) {
      setDetailsData(cachedRecipe.data);
      setUrl(null);
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
  }, [fetchedData, params.id]);

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

  console.log(cachedDetails, detailsData, fetchedData);

  return (
    <>
      <div className='pt-24'></div>
      <RecipeDetails detailsData={detailsData} />

      <section>
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
          <div className='shadow-lg rounded-lg overflow-hidden'>
             
            <div className=''>
              <h2 className='text-2xl font-semibold mb-4 border-b pb-2'>
                Ingredients
              </h2>
              <ul className='space-y-2 text-sm sm:text-base '>
                {detailsData?.extendedIngredients?.map((item, index) => (
                  <li
                    key={index}
                    className='flex items-center  pb-3 flex-wrap border-b ml-4'
                  >
                    <span className='font-medium mr-2'>
                      <span>{item.amount}</span> <span>{item.unit}</span>
                    </span>
                    <span className=''>{item.originalName}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className='pt-6'>
              <h2 className='text-2xl font-semibold mb-4 border-b pb-2'>
                Directions
              </h2>
              {detailsData?.analyzedInstructions?.map((instruction, i) => (
                <div
                  key={i}
                  className='mb-4'
                >
                  {instruction.name && (
                    <h3 className='text-xl font-medium mb-2'>
                      {instruction.name}
                    </h3>
                  )}
                  <ul className='space-y-2  '>
                    {instruction.steps.map((step) => (
                      <li
                        key={step.number}
                        className='ml-4'
                      >
                        <span className='font-semibold mr-2'>
                          Step {step.number}
                        </span>
                        {step.step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
