import { useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import useCleanupCache from '../hooks/useCleanupCache';
import useFetch from '../hooks/useFetch';
import PropTypes from 'prop-types';
import HeroListItem from './HeroListItem';

const HeroList = ({ id }) => {
  const { similarCache, setSimilarCache } = useContext(GlobalContext);
  const [urlSimilar, setUrlSimilar] = useState(null);
  const [similarData, setSimilarData] = useState(null);
  const cleanupCache = useCleanupCache();

  const { fetchedData, loading, error } = useFetch(urlSimilar);

  const checkSimilarCache = useCallback(
    (key) => {
      if (!key) return null;

      const cleanedCache = cleanupCache(similarCache);

      const cacheKey = key;
      const cachedResult = cleanedCache[cacheKey];

      if (cachedResult) {
        setSimilarData(cachedResult.data);
        setUrlSimilar(null);

        if (
          Object.keys(cleanedCache).length !== Object.keys(similarCache).length
        ) {
          setSimilarCache(cleanedCache);
          localStorage.setItem(
            'similarCacheData',
            JSON.stringify(cleanedCache),
          );
        }
      } else {
        setUrlSimilar(`/.netlify/functions/searchSimilar?query=${key}`);
      }
    },
    [cleanupCache, setSimilarCache, similarCache],
  );

  useEffect(() => {
    checkSimilarCache(id);
  }, [checkSimilarCache, id]);

  useEffect(() => {
    if (fetchedData) {
      const cacheKey = id;

      const updateCache = {
        ...similarCache,
        [cacheKey]: {
          data: fetchedData,
          timestamp: Date.now(),
        },
      };
      setSimilarCache(updateCache);

      localStorage.setItem('similarCacheData', JSON.stringify(updateCache));

      setSimilarData(fetchedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedData]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center text-2xl text-white">
        <div className="bg-background rounded-lg border border-purple-light p-6">
          Loading recipe details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-2xl">
        <div className="rounded-lg bg-accent-red p-6 text-white">
          Error: {error}
        </div>
      </div>
    );

  return (
    <>
      <div>
        {similarData ? (
          <div className="grid grid-cols-1 gap-6 xs:gap-4 md:grid-cols-3 md:gap-6 lg:gap-12">
            {similarData.map((recipe, i) => {
              return <HeroListItem key={i} recipe={recipe} />;
            })}
          </div>
        ) : (
          <div className="flex h-[600px] items-center justify-center">
            <div className="rounded-lg border border-purple-light p-6 text-2xl text-white transition-colors hover:border-purple-lightest">
              Search for a recipe
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default HeroList;

HeroList.propTypes = {
  id: PropTypes.number.isRequired,
};
