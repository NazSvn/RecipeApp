import { useEffect } from 'react';
import { useState, useCallback } from 'react';

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) {
      setFetchedData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setFetchedData(null);
    setError(null);

    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} (${response.statusText})`
        );
      }
      const result = await response.json();
      setFetchedData(result);
    } catch (error) {
      if (!signal.aborted) {
        setError(error.message || 'Unknown error occurred');
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchedData, error, loading, refetch: fetchData };
};

export default useFetch;
