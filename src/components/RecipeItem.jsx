import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeItem = ({ recipe }) => {
  return (
    <>
      <div className='rounded border relative '>
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
        <button className=' h-10 w-10 rounded-full absolute right-2 top-2  bg-orange-500'>
          fav
        </button>
      </div>
    </>
  );
};
export default RecipeItem;

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};
