import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

// Import styling from movie-view.scss
import '../../index.scss';

export const FavoriteMovies = ({ favoriteMovieList }) => {
  return (
    <>  
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.map((movies) => {
          return (
            <Col xs={12} md={6} lg={4} key={movies._id}>
              <img src={movies.ImagePath} />
              <Link to={'/movies/${movies._id'}>
                <h4>{movies.Title}</h4>
              </Link>
              <button variant='secondary' onClick={() => removeFav(movies._id)}>Remove from List</button>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
