import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import RecipeDetails from '../components/RecipeDetails';

const Favorites = () => {
  const { favorites } = useContext(GlobalContext); 

  return (
    <>
      <div>
        {favorites.map((favorite, i) => (
          <RecipeDetails
            key={i}
            detailsData={favorite}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;
