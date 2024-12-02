import { useState } from 'react';
import { GlobalContext } from './GlobalContext';
import PropTypes from 'prop-types';

const RecipeContextProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState(null);
  const value = {
    recipeList,
    setRecipeList,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default RecipeContextProvider;

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
