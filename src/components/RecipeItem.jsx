import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const RecipeItem = ({ recipe, isFavorite, toggleFav }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <>
      <div className='rounded border relative'>
        <Link to={`/details/${recipe.id}`}>
          <div>
            <img
              src={recipe.image}
              alt=''
            />
          </div>
          <div className='h-14 flex flex-col p-1'>
            <div className='text-base '>{recipe.title}</div>
            <div className=' font-bold text-lg'>{recipe.title}</div>
          </div>
        </Link>

        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className='absolute top-2 right-2 items-center justify-center border-slate-900'
          onClick={() => toggleFav(recipe)}
        >
          {isFavorite ? <IoHeart size={28} /> : <IoHeartOutline size={28} />}{' '}
        </button>
        <span
          className={`absolute top-9 font-medium -right-6 w-24 z-10 bg-slate-700 hover:bg-red-400 text-[0.5rem] text-center content-center py-1 border rounded-md ${
            showTooltip ? 'visible delay-1000 transition-all' : 'hidden'
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
