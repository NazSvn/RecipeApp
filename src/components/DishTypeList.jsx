import { useEffect, useState } from 'react';
import getCapitalizedText from '../utility/getCapitalizedText';
import PropTypes from 'prop-types';

const DishTypesList = ({ dishTypes }) => {
  const [showAllItems, setShowAllItems] = useState(window.innerWidth >= 500);

  useEffect(() => {
    const handleResize = () => {
      setShowAllItems(window.innerWidth >= 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderDishTypes = () => {
    const itemsToShow = showAllItems ? dishTypes : dishTypes.slice(0, 4);

    return itemsToShow.map((dishType, i) => (
      <span
        className="mr-3 text-xs text-purple-100 transition-colors hover:text-white"
        key={i}
      >
        {getCapitalizedText(dishType)}
      </span>
    ));
  };

  return (
    <div className="flex flex-wrap items-center">
      {renderDishTypes()}
      {!showAllItems && dishTypes.length > 4 && (
        <span className="text-xs text-purple-100">...</span>
      )}
    </div>
  );
};

export default DishTypesList;

DishTypesList.propTypes = {
  dishTypes: PropTypes.array.isRequired,
};
