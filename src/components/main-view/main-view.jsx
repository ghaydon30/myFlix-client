// Child component imports, note they must have capitalized names!
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Export MainView component for use in index.js, MainView is the highest level parent component
export const MainView = () => {
  // useState creates an array of movies set to following values, and updated with a method that is assigned to setMovies
  const [movies, setMovies] = useState([]);

useEffect(() => {
  // fetch returns a promise (object which represents completion
  // or failure of an asynchronous operation)
  fetch('https://cf-movies-flix-24da19dbdabb.herokuapp.com/movies')
  // .then function passed promise object from fetch
  // .then converts fetch promise response object to JSON object
  .then((res) => res.json())
  // 1st .then function passes callback (json object) to .then
  // 2nd .then logs JSON object data to console
  .then((data) => {
  // moviesFromApi set to doc array made using map function
  // .map() creates array with returned key value pairs defined below
    const moviesFromApi = data.map((doc) => {
      return {
        id: doc._id,
        title: doc.Title,
        director: doc.Director.Name,
        genre: doc.Genre.Name,
        description: doc.Description,
        image: doc.ImagePath
      };
    });
    // use setMovies function call from useState() to "hook" update
    // to state of your component (moviesFromApi array variable)
    setMovies(moviesFromApi);
  });
  // Empty dependency array passed as second argument to tell React
  // callback doesn't depend on changes in props or state
}, []);

  /* 
PREVIOUSLY USED MOVIES FOR TESTING PURPOSES
  {
      id: 1,
      title: 'Iron Man',
      director: 'Jon Favreau',
      genre: 'Action',
      description: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg'
    },
    {
      id: 2,
      title: 'Dunkirk',
      director: 'Christopher Nolan',
      genre: 'Drama',
      description: 'Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.',
      image: 'https://resizing.flixster.com/Q8brnMSWFLzW9S2nPmfqAYdQRQg=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2I1MWE0NTljLTA3ODgtNDZkYy04NTcwLTgzMzg3ZjRmMzRhNC53ZWJw'
    },
    {
      id: 3,
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Drama',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
      image: 'https://flxt.tmsimg.com/assets/p7825626_p_v8_af.jpg'
    }
*/

  // useState makes a variable selectedMovie beginning as null, that is updated with setSelectedMovie
  const [selectedMovie, setSelectedMovie] = useState(null);

  // sets selectedMovie to null if property onBackClick is actuated by event listener on movie-view
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  // returns a statement if the movies array is empty 
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      // map method maps each element in the movies array to a piece of the UI
      // This is done by filling and mapping a MovieCard with information from movies
      <div>
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }

};