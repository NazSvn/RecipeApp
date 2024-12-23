import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import GetRecipeImage from '../utility/GetRecipeImages';

const RecipeItem = ({ recipe, isFavorite, toggleFavsFromHomePage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="height group relative w-full">
        <Link to={`/details/${recipe?.id}`}>
          <div className="h-[75%] w-full overflow-hidden rounded-md object-cover">
            {recipe && (
              <GetRecipeImage recipe={recipe} classes="h-full w-full" />
            )}
          </div>

          <div className="relative mt-3 text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-orange after:transition-all after:duration-700 group-hover:after:w-full">
            {recipe?.title}
          </div>
        </Link>

        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute right-2 top-2 items-center justify-center border-slate-900"
          onClick={() => toggleFavsFromHomePage(recipe)}
        >
          {isFavorite || isHovered ? (
            <IoHeart size={35} className="text-purple-light" />
          ) : (
            <IoHeartOutline size={35} className="text-purple" />
          )}{' '}
        </button>
      </div>
    </>
  );
};
export default RecipeItem;

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  toggleFavsFromHomePage: PropTypes.func,
};
