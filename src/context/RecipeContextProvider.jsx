import { useState } from 'react';
import { GlobalContext } from './GlobalContext';
import PropTypes from 'prop-types';

const RecipeContextProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteList');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const value = {
    recipeList,
    setRecipeList,
    favorites,
    setFavorites,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default RecipeContextProvider;

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
