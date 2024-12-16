import { useCallback, useContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { GlobalContext } from '../context/GlobalContext';

const RANDOM_DATA_AGE_LIMIT = 30 * 60 * 1000;

const Hero = () => {
  const { randomCache, setRandomCache } = useContext(GlobalContext);
  const [heroData, setHeroData] = useState(null);
  const [url, setUrl] = useState(null);

  const { fetchedData, loading, error } = useFetch(url);

  const checkCache = useCallback(() => {
    const storedCache = localStorage.getItem('randomCacheData');
    let parsedCache;
    try {
      parsedCache = storedCache ? JSON.parse(storedCache) : null;
    } catch (parseError) {
      parsedCache = null;
      console.error('Error parsing stored cache', parseError);
    }

    if (
      randomCache &&
      randomCache.timestamp &&
      parsedCache.timestamp &&
      randomCache.data &&
      Date.now() - randomCache.timestamp < RANDOM_DATA_AGE_LIMIT
    ) {
      setHeroData(randomCache.data);
      setUrl(null);
      console.log('using random cache');
    } else {
      setUrl(
        `https://api.spoonacular.com/recipes/random?`,
      );
      console.log('making API call');
    }
  }, [randomCache]);

  useEffect(() => {
    checkCache();
  }, [checkCache]);

  useEffect(() => {
    if (fetchedData) {
      const updateRandomCache = {
        data: fetchedData,
        timestamp: Date.now(),
      };

      try {
        setRandomCache(updateRandomCache);
        localStorage.setItem(
          'randomCacheData',
          JSON.stringify(updateRandomCache),
        );
        setHeroData(fetchedData);
      } catch (storageError) {
        console.error('Error updating cache', storageError);
      }
    }
  }, [fetchedData, setRandomCache]);

  console.log(heroData);

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
      <section className="mx-auto max-w-[648px] p-6 md:max-w-none lg:max-w-[1280px]">
        <div className="relative mx-auto w-3/5">
          <img
            className="h-full w-full"
            src={heroData?.recipes[0]?.image}
            alt={`${heroData?.recipes[0]?.title} image`}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = `https://placehold.co/800x600?text=${heroData?.recipes[0]?.title}`;
            }}
          />
          <div className="absolute bottom-5 left-6 max-w-[70%] bg-white/30 p-3 text-black backdrop-blur-md">
            <div className="mb-1">
              {heroData?.recipes[0]?.dishTypes.map((dishType, i) => (
                <span key={i}>
                  {dishType.charAt(0).toUpperCase().concat(dishType.slice(1))}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-medium">
              {heroData?.recipes[0]?.title}
            </h1>
            <div className="mt-1">
              {heroData?.recipes[0]?.diets.map((diet, i) => (
                <span className="mr-2" key={i}>
                  {diet.charAt(0).toUpperCase().concat(diet.slice(1))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
