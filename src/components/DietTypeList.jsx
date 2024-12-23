import PropTypes from 'prop-types';
import getCapitalizedText from '../utility/getCapitalizedText';

const DietTypesList = (diets) => {
  if (!diets || diets.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Diet Types">
      {diets.map((diet, index) => (
        <span
          key={`${diet}-${index}`}
          className="rounded-sm bg-purple px-2 py-1 text-xs text-white transition-colors sm:text-sm"
          role="listitem"
        >
          {getCapitalizedText(diet)}
        </span>
      ))}
    </div>
  );
};

DietTypesList.propTypes = {
  diets: PropTypes.arrayOf(PropTypes.string),
};

export default DietTypesList;
