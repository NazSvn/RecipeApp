import PropTypes from 'prop-types';
import GetRecipeImage from '../utility/GetRecipeImages';
import { Link } from 'react-router-dom';
import DietTypesList from './DietTypeList';
import DishTypesList from './DishTypeList';
const Hero = ({ heroData, loading, error }) => {
  const description = heroData?.summary;
  const descPart = description?.split('.');
  const shortenedDescription = descPart?.slice(0, 2).join('.') + '.';

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center text-2xl text-white">
        <div className="bg-background rounded-lg border border-purple-light p-6">
          Loading recipe details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-2xl">
        <div className="rounded-lg bg-accent-red p-6 text-white">
          Error: {error}
        </div>
      </div>
    );

  return (
    <>
      <section className="mx-auto p-6 md:max-w-none lg:max-w-[1280px]">
        <Link to={`/details/${heroData?.id}`}>
          <div className="relative mx-auto overflow-hidden rounded-md transition-shadow hover:shadow-lg lg:w-[940px]">
            {heroData && (
              <GetRecipeImage recipe={heroData} classes="h-full w-full" />
            )}
            <div className="absolute bottom-1 left-1 overflow-hidden rounded-md bg-purple/60 px-2 py-1 backdrop-blur-md transition-colors hover:bg-purple-dark/80 xs:max-w-[90%] sm:max-w-[70%] sm:p-3 md:bottom-5 md:left-6">
              <div className="mb-1">
                {heroData && <DishTypesList dishTypes={heroData?.dishTypes} />}
              </div>

              <h1 className="font-medium xs:text-3xl">{heroData?.title}</h1>
              <div className="mt-3 hidden xs:block">
                {DietTypesList(heroData?.diets)}
              </div>
              <div
                className="mt-2 hidden sm:block"
                dangerouslySetInnerHTML={{ __html: shortenedDescription }}
              />
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default Hero;

Hero.propTypes = {
  heroData: PropTypes.object,
  loading: PropTypes.node,
  error: PropTypes.node,
};
