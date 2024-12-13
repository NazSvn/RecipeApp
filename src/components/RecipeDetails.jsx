import {
  IoHeartDislike,
  IoHeartOutline,
  IoPieChart,
  IoTimeOutline,
} from 'react-icons/io5';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/GlobalContext';

const RecipeDetails = ({ detailsData }) => {
  const { favorites, toggleFav } = useContext(GlobalContext);

  const description = detailsData?.summary;
  const descPart = description?.split('.');
  const shortenedDescription = descPart?.slice(0, 2).join('.') + '.';

  const isFavorite = favorites.some((fav) => fav.id === detailsData?.id);

  return (
    <>
      <section className="bg-slate-400 p-10 sm:h-[500px]">
        {RecipeDetails && (
          <div className="mx-auto grid grid-cols-1 gap-5 sm:max-w-4xl sm:[grid-template-columns:1fr_2fr]">
            <div className="mx-auto h-60 w-60 md:h-80 md:w-80">
              <img
                className="h-60 rounded-md object-cover md:h-80"
                src={detailsData?.image}
                alt={`${detailsData?.title}'s image`}
              />
            </div>
            <div>
              <div>
                <h1 className="mb-5 text-3xl">{detailsData?.title}</h1>
              </div>
              <div className="mb-4 flex content-center gap-4">
                <div>
                  <span>
                    <IoPieChart size={28} className="mr inline" />
                  </span>{' '}
                  servings: {detailsData?.servings}
                </div>
                <div>
                  <span>
                    <IoTimeOutline size={28} className="mr inline" />
                  </span>{' '}
                  Ready in: {detailsData?.readyInMinutes} min
                </div>
              </div>

              <div
                className="mb-5 text-left"
                dangerouslySetInnerHTML={{
                  __html: shortenedDescription,
                }}
              />

              <div>
                {detailsData?.diets?.map((tag, i) => (
                  <div className="mr-4 inline text-sm font-bold" key={i}>
                    {tag}
                  </div>
                ))}
              </div>
              <button
                className="mt-16 flex h-10 w-52 items-center justify-center gap-2 rounded-md border border-slate-900"
                onClick={() => toggleFav(detailsData)}
              >
                {isFavorite ? (
                  <IoHeartDislike size={28} />
                ) : (
                  <IoHeartOutline size={28} />
                )}{' '}
                <span>
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </button>
            </div>
            <div>{detailsData?.creditsText}</div>
          </div>
        )}
      </section>

      <section>
        {detailsData && (
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                  Ingredients
                </h2>
                <ul className="space-y-2 text-sm sm:text-base">
                  {detailsData?.extendedIngredients?.map((item, index) => (
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

              {/* Instructions Section */}
              <div className="pt-6">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                  Directions
                </h2>
                {detailsData?.analyzedInstructions?.map((instruction, i) => (
                  <div key={i} className="mb-4">
                    {instruction.name && (
                      <h3 className="mb-2 text-xl font-medium">
                        {instruction.name}
                      </h3>
                    )}
                    <ul className="space-y-2">
                      {instruction.steps.map((step) => (
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
          </div>
        )}
      </section>
    </>
  );
};

export default RecipeDetails;

RecipeDetails.propTypes = {
  detailsData: PropTypes.object,
};
