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
      <section className='bg-slate-400 sm:h-[500px] p-10'>
        {RecipeDetails && (
          <div className='mx-auto gap-5 grid grid-cols-1 sm:[grid-template-columns:1fr_2fr]  sm:max-w-4xl'>
            <div className='w-60 md:w-80 h-60 md:h-80  mx-auto'>
              <img
                className='h-60 md:h-80 object-cover rounded-md'
                src={detailsData?.image}
                alt={`${detailsData?.title}'s image`}
              />
            </div>
            <div>
              <div>
                <h1 className='text-3xl mb-5'>{detailsData?.title}</h1>
              </div>
              <div className='flex gap-4 content-center mb-4'>
                <div>
                  <span>
                    <IoPieChart
                      size={28}
                      className='inline mr'
                    />
                  </span>{' '}
                  servings: {detailsData?.servings}
                </div>
                <div>
                  <span>
                    <IoTimeOutline
                      size={28}
                      className='inline mr'
                    />
                  </span>{' '}
                  Ready in: {detailsData?.readyInMinutes} min
                </div>
              </div>

              <div
                className='text-left mb-5'
                dangerouslySetInnerHTML={{
                  __html: shortenedDescription,
                }}
              />

              <div>
                {detailsData?.diets?.map((tag, i) => (
                  <div
                    className='text-sm inline font-bold mr-4'
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <button
                className='w-52 h-10 mt-16 gap-2 border rounded-md flex items-center justify-center border-slate-900'
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
          <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <div className='shadow-lg rounded-lg overflow-hidden'>
              <div className=''>
                <h2 className='text-2xl font-semibold mb-4 border-b pb-2'>
                  Ingredients
                </h2>
                <ul className='space-y-2 text-sm sm:text-base '>
                  {detailsData?.extendedIngredients?.map((item, index) => (
                    <li
                      key={index}
                      className='flex items-center  pb-3 flex-wrap border-b ml-4'
                    >
                      <span className='font-medium mr-2'>
                        <span>{item.amount}</span> <span>{item.unit}</span>
                      </span>
                      <span className=''>{item.originalName}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Section */}
              <div className='pt-6'>
                <h2 className='text-2xl font-semibold mb-4 border-b pb-2'>
                  Directions
                </h2>
                {detailsData?.analyzedInstructions?.map((instruction, i) => (
                  <div
                    key={i}
                    className='mb-4'
                  >
                    {instruction.name && (
                      <h3 className='text-xl font-medium mb-2'>
                        {instruction.name}
                      </h3>
                    )}
                    <ul className='space-y-2  '>
                      {instruction.steps.map((step) => (
                        <li
                          key={step.number}
                          className='ml-4'
                        >
                          <span className='font-semibold mr-2'>
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
