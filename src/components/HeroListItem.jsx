import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GetRecipeImage from '../utility/GetRecipeImages';

const HeroListItem = ({ recipe }) => {
  return (
    <>
      <div className="height group relative w-full">
        <Link to={`/details/${recipe?.id}`}>
          <div className="h-[75%] w-full overflow-hidden rounded-md object-cover">
            {recipe && (
              <GetRecipeImage recipe={recipe} classes="h-full w-full" />
            )}
          </div>

          <div className="relative mt-3 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-orange after:transition-all after:duration-700 group-hover:after:w-full xs:text-xl md:text-base md:font-normal lg:text-xl lg:font-medium">
            {recipe?.title}
          </div>
        </Link>
      </div>
    </>
  );
};
export default HeroListItem;

HeroListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};
