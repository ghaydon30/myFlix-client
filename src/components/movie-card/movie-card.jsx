import React from 'react';

// Import that allows you to validate the types of props that this component will receive
import PropTypes from 'prop-types';

// Import button and card bootstrap components, card will be used for individual movie cards
import { Button, Card, Row, Col } from 'react-bootstrap';

// Used for navigation without re-rendering the entire page
import { Link } from 'react-router-dom';

// import '../styles/styles.scss';
import '../../index.scss';

// Export for MovieCard component (passed movie prop)
export const MovieCard = ({ movie, addFav, deleteFav, user }) => {
  
  const isFavorite = user.FavoriteMovies.includes(movie.id);
  
  // Returns an individual card for the selected movie
  return (
    // Card component holds the MovieCard itself
    // All Card.Part_of_Card contain sub-components that provide styling details
    <Card className="h-100">
      {/* height='400' */}
      <Card.Img className="styled_movie-card" variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>

        {/* Conditional rendering for the favorite button */}
        <Row>
          <Col>
            {/* 
            encodeURIComponent is used to replace non-alphanumeric characters with URL-friendly characters 
          
            `Link` Element links to the MovieView Route in MainView, as it is imported into that 
            particular Route, it is considered in the same context

            Template literal `` used on the link
            */}
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              {/* Link is actuated by pressing this button, the 'link' variant provides a styling prop */}
              <Button variant="primary" className="primary-button_custom">
                Open
              </Button>
              {/*  */}
            </Link>
          </Col>
          <Col>
            {isFavorite ? (
              <Button
                variant="primary"
                className="primary-button_custom"
                onClick={() => deleteFav(movie.id)}
              >
                Unfavorite
              </Button>
            ) : (
              <Button
                variant="primary"
                className="primary-button_custom"
                onClick={() => addFav(movie.id)}
              >
                Favorite
              </Button>
            )}
          </Col>
        </Row>
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
};