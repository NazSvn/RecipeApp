import { useCallback, useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import RecipeItem from './RecipeItem';
import useCleanupCache from '../hooks/useCleanupCache';
import useFetch from '../hooks/useFetch';

const RecipeList = () => {
  const { recipeList, favorites, setFavorites, cachedDetails } =
    useContext(GlobalContext);
  const [url, setUrl] = useState(null);

  const { fetchedData } = useFetch(url);

  const getFavoriteTag = useCallback(
    (recipeId) => {
      if (!recipeId) return false;
      return favorites.some((fav) => fav.id === recipeId);
    },
    [favorites],
  );

  const cleanupCache = useCleanupCache();

  const checkCache = useCallback(
    (recipe) => {
      const recipeId = recipe.id;

      const cleanedCache = cleanupCache(cachedDetails);
      const cachedRecipe = cleanedCache[recipeId];

      if (cachedRecipe) {
        setFavorites((currentFavorites) => {
          const updatedFavorites = [
            ...currentFavorites,
            { ...cachedRecipe.data, isFavorite: true },
          ];

          localStorage.setItem(
            'favoriteList',
            JSON.stringify(updatedFavorites),
          );
          return updatedFavorites;
        });
        setUrl(null);
      } else {
        setUrl(`/.netlify/functions/searchDetails?recipeId=${recipeId}`);
      }
    },
    [cachedDetails, cleanupCache, setFavorites],
  );

  const toggleFavsFromHomePage = useCallback(
    (recipe) => {
      const isFavoriteRecipe = favorites.some((fav) => fav.id === recipe.id);

      if (isFavoriteRecipe) {
        setFavorites((currentFavorites) => {
          const updatedFavorites = currentFavorites.filter(
            (fav) => fav.id !== recipe.id,
          );

          localStorage.setItem(
            'favoriteList',
            JSON.stringify(updatedFavorites),
          );
          return updatedFavorites;
        });
      } else {
        checkCache(recipe);
      }
    },
    [checkCache, favorites, setFavorites],
  );

  useEffect(() => {
    if (fetchedData) {
      setFavorites((currentFavorites) => {
        const updatedFavorites = [
          ...currentFavorites,
          { ...fetchedData, isFavorite: true },
        ];

        localStorage.setItem('favoriteList', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
  }, [fetchedData, setFavorites]);

  return (
    <>
      <section className="mx-auto max-w-[648px] p-6 md:max-w-none lg:max-w-[1280px]">
        <div>
          {recipeList ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-12">
              {recipeList?.results?.map((recipe, i) => {
                const isFavorite = getFavoriteTag(recipe.id);
                return (
                  <RecipeItem
                    key={i}
                    recipe={recipe}
                    isFavorite={isFavorite}
                    toggleFavsFromHomePage={toggleFavsFromHomePage}
                  />
                );
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
      </section>
    </>
  );
};

export default RecipeList;
