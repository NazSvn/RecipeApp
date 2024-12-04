import { useCallback } from 'react';
import { CACHE_AGE_LIMIT } from '../services/cacheAgeLimit';

const useCleanupCache = () => {
  return useCallback((existingCache) => {
    const now = Date.now();
    const cleanedCache = Object.keys(existingCache).reduce((acc, key) => {
      const cacheEntry = existingCache[key];
      const cacheAge = now - cacheEntry.timestamp;

      if (cacheAge < CACHE_AGE_LIMIT) {
        acc[key] = cacheEntry;
      }
      return acc;
    }, {});
    return cleanedCache;
  }, []);
};

export default useCleanupCache;
