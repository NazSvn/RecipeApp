import {
  IoHeartCircleOutline,
  IoPieChart,
  IoTimeOutline,
} from 'react-icons/io5';

import PropTypes from 'prop-types';

const RecipeDetails = ({ detailsData }) => {
  const description = detailsData?.summary;
  const descPart = description?.split('.');
  const shortenedDescription = descPart?.slice(0, 2).join('.') + '.';

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
              <button className='w-52 h-10 mt-16 gap-2 border rounded-md flex items-center justify-center border-slate-900'>
                <IoHeartCircleOutline size={28} /> <span>Add to favorites</span>
              </button>
            </div>
            <div>{detailsData?.creditsText}</div>
          </div>
        )}
      </section>
    </>
  );
};

export default RecipeDetails;

RecipeDetails.propTypes = {
  detailsData: PropTypes.object.isRequired,
};
