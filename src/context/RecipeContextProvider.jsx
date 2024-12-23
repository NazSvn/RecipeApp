import { useCallback, useRef, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import PropTypes from 'prop-types';

const RecipeContextProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState(null); 

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteList');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [cachedDetails, setCachedDetails] = useState(() => {
    const savedCache = localStorage.getItem('recipeCache');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const [randomCache, setRandomCache] = useState(() => {
    const savedCache = localStorage.getItem('randomCacheData');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const [similarCache, setSimilarCache] = useState(() => {
    const savedCache = localStorage.getItem('similarCacheData');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const [detailsData, setDetailsData] = useState(null);

  const [showingSearch, setShowingSearch] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();
  const toggleSearchRef = useRef();

  const toggleFav = useCallback((recipe) => {
    setFavorites((currentFavorites) => {
      const isFavoriteRecipe = currentFavorites.some(
        (fav) => fav.id === recipe.id,
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
    cachedDetails,
    setCachedDetails,
    detailsData,
    setDetailsData,
    randomCache,
    setRandomCache,
    similarCache,
    setSimilarCache,
    showingSearch,
    setShowingSearch,
    inputRef,
    toggleSearchRef,
    inputValue,
    setInputValue,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default RecipeContextProvider;

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
