// Child component imports, note they must have capitalized names!
import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Export MainView component for use in index.js, MainView is the highest level parent component
export const MainView = () => {
  // useState creates an array of movies set to following values, and updated with a method that is assigned to setMovies
  const [movies, setMovies] = useState([
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
  ]);

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