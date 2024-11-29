import { GlobalContext } from './GlobalContext';
import PropTypes from 'prop-types';

const RecipeContextProvider = ({ children }) => {
  const value = {};

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default RecipeContextProvider;

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
