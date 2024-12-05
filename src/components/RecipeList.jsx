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
      <section className='max-w-[648px] mx-auto p-6 md:max-w-none lg:max-w-[1280px]'>
        <div>
          {recipeList ? (
            <div className='grid gap-4 grid-cols-1  md:gap-6 md:grid-cols-3 lg:gap-12'>
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
