import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import RecipeDetails from '../components/RecipeDetails';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeDirections from '../components/RecipeDirections';

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);
  const [expandedRecipes, setExpandedRecipes] = useState(new Set());

  const toggleRecipe = (recipeId) => {
    setExpandedRecipes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="pt-24"></div>

      {favorites.map((favorite) => {
        const isExpanded = expandedRecipes.has(favorite.id);

        return (
          <div
            key={favorite.id}
            className="cursor-pointer"
            onClick={() => toggleRecipe(favorite.id)}
          >
            <div className="cursor-pointer">
              <RecipeDetails detailsData={favorite} />
            </div>
            <div
              className={`transform transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-full translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-4'} `}
            >
              <div
                className={`p-4 transition-all delay-[200ms] duration-[350ms] ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
              >
                <RecipeIngredients
                  ingredients={favorite?.extendedIngredients}
                />
              </div>
            </div>
            <div
              className={`transform transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-full translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-4'} `}
            >
              <div
                className={`p-4 transition-all delay-150 duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
              >
                <RecipeDirections directions={favorite?.analyzedInstructions} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Favorites;
