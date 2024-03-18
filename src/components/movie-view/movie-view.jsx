// Import hook which allows you to access parameters from the current Route
// In this case we use 
import { useParams } from 'react-router-dom';

// Used for navigation without re-rendering the entire page
import { Link } from 'react-router-dom';

// React Bootstrap is a native bootstrap rebuild in react for front-end styling
import { Card, Row, Col, Button } from 'react-bootstrap';

// Import styling from movie-view.scss
import '../../index.scss';

// Export statement for MovieView component to MainView
export const MovieView = ({ movies }) => {
  // Use useParams to get parameters for the current `Route` path
  // In this case from MainView, `Route` is path='/movies/:MovieId'
  // Note that the variable MovieId must exactly match the parameter useParams is searching for
  // ie the :MovieId portion of the route
  const {MovieId} = useParams();
  // Set a movie variable to the movie JSON object corresponding to the MovieId
  const movie = movies.find((m) => m.id === MovieId);

  // If the previous statement finds no match
  if (!movie) {
    // Log the MovieId variable for troubleshooting
    console.error(`No movie found with ID: ${MovieId}`);
    return <div>No movie found</div>; // or some alternative rendering or redirection
  }
  
  return (    
    // Card, Row, and Column hold pieces of the movie object defined in the find statement
    <Card className='shadow' >
      <Row>
        <Col>
          <Card.Img 
            className='img-movie_view'
            src={movie.image}
          />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{'Director: ' + movie.director}</Card.Text>
            <Card.Text>{'Genre: ' + movie.genre}</Card.Text>
            <Card.Text>{'Description: ' + movie.description}</Card.Text>
            <Link to='/'>
              <Button className='close-open-btn'>Back</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
    
  );
};