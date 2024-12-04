import { useCallback, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import PropTypes from 'prop-types';

const RecipeContextProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteList');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFav = useCallback((recipe) => {
    setFavorites((currentFavorites) => {
      const isFavoriteRecipe = currentFavorites.some(
        (fav) => fav.id === recipe.id
      );
      const updatedFavorites = isFavoriteRecipe
        ? currentFavorites.filter((fav) => fav.id !== recipe.id)
        : [...currentFavorites, { ...recipe, isFavorite: true }];

      localStorage.setItem('favoriteList', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, []);

  const value = {
    recipeList,
    setRecipeList,
    favorites,
    setFavorites,
    toggleFav,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default RecipeContextProvider;

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
