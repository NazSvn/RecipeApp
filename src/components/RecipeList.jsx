import { useCallback, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import RecipeItem from './RecipeItem';

const RecipeList = () => {
  const { recipeList, favorites, toggleFav } = useContext(GlobalContext);

  const getFavoriteTag = useCallback(
    (recipeId) => {
      if (!recipeId) return false;
      return favorites.some((fav) => fav.id === recipeId);
    },
    [favorites]
  );

  return (
    <>
      <section>
        <div>
          {recipeList ? (
            <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
              {recipeList?.results?.map((recipe, i) => {
                const isFavorite = getFavoriteTag(recipe.id);
                return (
                  <RecipeItem
                    key={i}
                    recipe={recipe}
                    isFavorite={isFavorite}
                    toggleFav={toggleFav}
                  />
                );
              })}
            </div>
          ) : (
            <div className='flex  justify-center items-center  h-screen  text-2xl text-gray-600'>
              Search for a recipe
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RecipeList;
