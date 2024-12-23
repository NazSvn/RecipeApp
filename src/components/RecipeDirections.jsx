import PropTypes from 'prop-types';
const RecipeDirections = ({ directions }) => {
  return (
    <>
      {directions && <div className="container mx-auto max-w-4xl p-4">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="pt-6">
            <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
              Directions
            </h2>
            {directions.map((direction, i) => (
              <div key={i} className="mb-4">
                {direction.name && (
                  <h3 className="mb-2 text-xl font-medium">{direction.name}</h3>
                )}
                <ul className="space-y-2">
                  {direction.steps.map((step) => (
                    <li key={step.number} className="ml-4">
                      <span className="mr-2 font-semibold">
                        Step {step.number}
                      </span>
                      {step.step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </>
  );
};

export default RecipeDirections;

RecipeDirections.propTypes = {
  directions: PropTypes.array.isRequired,
};
