import PropTypes from 'prop-types';
import { useState } from 'react';

const GetRecipeImage = ({ recipe, classes }) => {
  const [imageError, setImageError] = useState(false);

  if (!recipe) return null;

  if (imageError) {
    return (
      <div
        className={classes}
        style={{
          backgroundColor: '#9966CC',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF6B6B',
          fontSize: '2rem',
        }}
      >
        Recipe Image Unavailable
      </div>
    );
  }

  const sizes = {
    thumbnail: '90x90',
    small: '240x150',
    medium: '312x150',
    mediumTall: '312x231',
    large: '480x360',
    xlarge: '556x370',
    xxlarge: '636x393',
  };

  const generateUrl = (size) =>
    `https://spoonacular.com/recipeImages/${recipe.id}-${size}.${recipe.imageType}`;

  const handleImageError = () => {
    console.log('Image failed to load, showing fallback div');
    setImageError(true);
  };

  return (
    <img
      className={classes}
      src={generateUrl(sizes.xlarge)}
      srcSet={`
        ${generateUrl(sizes.thumbnail)} 90w,
        ${generateUrl(sizes.small)} 240w,
        ${generateUrl(sizes.medium)} 312w,
        ${generateUrl(sizes.mediumTall)} 312w,
        ${generateUrl(sizes.large)} 480w,
        ${generateUrl(sizes.xlarge)} 556w,
        ${generateUrl(sizes.xxlarge)} 636w
      `}
      sizes="(max-width: 640px) 312px,
           (max-width: 768px) 480px,
           (max-width: 1024px) 556px,
           636px"
      alt={`${recipe.title} image`}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default GetRecipeImage;

GetRecipeImage.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageType: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.string.isRequired,
};
