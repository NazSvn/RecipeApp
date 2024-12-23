import {
  IoHeartDislike,
  IoHeartOutline,
  IoPieChart,
  IoTimeOutline,
} from 'react-icons/io5';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/GlobalContext';
import GetRecipeImage from '../utility/GetRecipeImages';
import DietTypeList from './DietTypeList';

const RecipeDetails = ({ detailsData }) => {
  const { favorites, toggleFav } = useContext(GlobalContext);

  const description = detailsData?.summary;
  const descPart = description?.split('.');
  const shortenedDescription = descPart?.slice(0, 2).join('.') + '.';

  const isFavorite = favorites.some((fav) => fav.id === detailsData?.id);

  return (
    <>
      <section className="block content-center p-4 md:h-[500px] md:bg-[#6633993b] md:p-6">
        {RecipeDetails && (
          <div className="mx-auto grid grid-cols-1 gap-5 sm:max-w-[85%] md:max-w-4xl md:[grid-template-columns:1fr_2fr]">
            <div className="mx-auto w-full md:h-80 md:w-80">
              {detailsData && (
                <GetRecipeImage
                  recipe={detailsData}
                  classes="h-[355px] w-[390px] min-[500px]:w-full rounded-sm sm:rounded-md object-cover md:h-80"
                />
              )}
              <div className="mt-2 text-sm md:text-base">
                {detailsData?.creditsText}
              </div>
            </div>
            <div>
              <h1 className="mb-5 text-3xl">{detailsData?.title}</h1>

              <div className="mb-4 flex content-center gap-4">
                <div>
                  <span>
                    <IoPieChart
                      size={28}
                      className="mr inline text-accent-lime"
                    />
                  </span>{' '}
                  servings: {detailsData?.servings}
                </div>
                <div>
                  <span>
                    <IoTimeOutline
                      size={28}
                      className="mr inline text-accent-lime"
                    />
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
                {detailsData?.diets &&
                  detailsData.diets.length > 0 &&
                  DietTypeList(detailsData?.diets)}
              </div>
              <button
                className="mt-6 flex h-10 w-52 items-center justify-center gap-2 rounded-md border border-slate-900 bg-[#663399] sm:mt-5"
                onClick={() => toggleFav(detailsData)}
              >
                {isFavorite ? (
                  <IoHeartDislike size={28} className="text-accent-orange" />
                ) : (
                  <IoHeartOutline size={28} className="text-accent-orange" />
                )}{' '}
                <span>
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </button>
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
