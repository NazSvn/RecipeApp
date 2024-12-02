import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import RecipeItem from './RecipeItem';

const RecipeList = () => {
  const { recipeList } = useContext(GlobalContext);
  return (
    <>
      <section >
        <div>
          {recipeList ? (
            <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
              {recipeList?.results?.map((recipe, i) => (
                <RecipeItem
                  key={i}
                  recipe={recipe}
                />
              ))}
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
