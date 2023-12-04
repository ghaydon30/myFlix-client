import PropTypes from 'prop-types';
// Import button and card for using these bootstrap components
import { Button, Card } from 'react-bootstrap';

// Export this component for use in MainView
// Card has onClick as an event listener inside of a Bootstrap card component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant='link'>
          Open
        </Button>
      </Card.Body>
    </Card>
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