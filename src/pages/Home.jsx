import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Hero from '../components/Hero';
import useFetch from '../hooks/useFetch';
import { GlobalContext } from '../context/GlobalContext';
import { CACHE_AGE_LIMIT } from '../services/cacheAgeLimit';
import HeroList from '../components/Herolist';

const Home = () => {
  const { randomCache, setRandomCache } = useContext(GlobalContext);
  const [heroData, setHeroData] = useState(null);
  const [url, setUrl] = useState(null);

  const { fetchedData, loading, error } = useFetch(url);

  const shouldUseCache = useMemo(() => {
    const storedCache = localStorage.getItem('randomCacheData');
    let parsedCache;
    try {
      parsedCache = storedCache ? JSON.parse(storedCache) : null;
    } catch (parseError) {
      parsedCache = null;
      console.error('Error parsing stored cache', parseError);
    }

    return (
      randomCache &&
      randomCache.timestamp &&
      parsedCache.timestamp &&
      randomCache.data &&
      Date.now() - randomCache.timestamp < CACHE_AGE_LIMIT
    );
  }, [randomCache]);

  const checkCache = useCallback(() => {
    if (shouldUseCache) {
      setHeroData(randomCache.data);
      setUrl(null);
    } else {
      setUrl(`/.netlify/functions/searchRandom`);
    }
  }, [shouldUseCache, randomCache.data]);

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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-2xl text-gray-600">
        Loading recipe details...
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen flex-col items-center justify-center text-accent-red">
        <h2 className="mb-4 text-2xl">Error loading recipes</h2>
        <p className="text-lg">{error}</p>
        <button
          onClick={checkCache}
          className="mt-4 rounded bg-accent-red px-4 py-2 text-white hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <>
      <div className="pt-24"></div>
      <Hero heroData={heroData?.recipes[0]} loading={loading} error={error} />
      <section className="mx-auto max-w-[648px] p-6 md:max-w-none lg:max-w-[940px] lg:p-0">
        <h1 className="mb-10 mt-2 text-3xl font-medium">Recomendations</h1>
        {heroData?.recipes[0] && <HeroList id={heroData?.recipes[0].id} />}
      </section>
    </>
  );
};

export default Home;
