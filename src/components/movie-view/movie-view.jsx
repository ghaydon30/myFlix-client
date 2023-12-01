// Import styling from movie-view.scss
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    // Button allows for user to go back to the main list with onBackClick
    // This sets the selectedMovie attribute back to null
    <div>
      <div>
        <img className='img-movie_view' src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <button onClick={onBackClick} className='back-button'>Back</button>
    </div>
  );
};