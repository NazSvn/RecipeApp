import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const RecipeItem = ({ recipe, isFavorite, toggleFav }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  console.log(recipe);
  return (
    <>
      <div className="height group relative w-full">
        <Link to={`/details/${recipe.id}`}>
          <div className="h-[75%] w-full object-cover">
            <img
              className="h-full w-full"
              src={recipe.image}
              alt={`${recipe.title} image`}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = `https://placehold.co/800x600?text=${recipe.title}`;
              }}
            />
          </div>
          <div className="flex h-14 flex-col pt-4">
            <div className="text-sm font-medium">{recipe.title}</div>
            <div className="relative text-xl font-bold leading-9 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#fa770d] after:transition-all after:duration-700 group-hover:after:w-full">
              {recipe.title}
            </div>
          </div>
        </Link>

        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="absolute right-2 top-2 items-center justify-center border-slate-900"
          onClick={() => toggleFav(recipe)}
        >
          {isFavorite ? (
            <IoHeart size={35} className="text-[#fa770d]" />
          ) : (
            <IoHeartOutline size={35} className="text-[#fa770d]" />
          )}{' '}
        </button>
        <span
          className={`absolute -right-6 top-10 z-10 w-24 content-center rounded-md border bg-slate-700 py-1 text-center text-[0.5rem] font-medium ${
            showTooltip ? 'visible transition-all delay-1000' : 'hidden'
          }`}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </span>
      </div>
    </>
  );
};
export default RecipeItem;

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFav: PropTypes.func.isRequired,
};
