import PropTypes from 'prop-types';

// Export this component for use in MainView
// Card has onClick as an event listener inside of a div, as the listener cannot apply directly to a component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

// Define prop constraints for MovieCard using PropTypes
MovieCard.propTypes = {
  // Requires that props object contains a movie object (shape means object)
  // props movie object must contain below required data types
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  // props object must contain onMovieClick and it must be a function
  onMovieClick: PropTypes.func.isRequired
};