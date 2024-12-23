import PropTypes from 'prop-types';

const RecipeIngredients = ({ ingredients }) => {
  return (
    <>
      <section>
        {ingredients && (
          <div className="container mx-auto max-w-4xl p-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                  Ingredients
                </h2>
                <ul className="space-y-2 text-sm sm:text-base">
                  {ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="ml-4 flex flex-wrap items-center border-b pb-3"
                    >
                      <span className="mr-2 font-medium">
                        <span>{item.amount}</span> <span>{item.unit}</span>
                      </span>
                      <span className="">{item.originalName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default RecipeIngredients;
RecipeIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};
