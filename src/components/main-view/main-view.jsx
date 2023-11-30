// Child component imports, note they must have capitalized names!
// The location is not required to have the ".jsx" at the end
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';



// Export MainView component for use in index.js, MainView is the highest level parent component
export const MainView = () => {
  
  // useState creates an array of movies set to following values, and updated with a method that is assigned to setMovies
  const [movies, setMovies] = useState([]);
  // useState makes a variable selectedMovie beginning as null, that is updated with setSelectedMovie
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Use stored values (in localStorage) as default values of user and token states (what we got from the back end)
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = JSON.parse(localStorage.getItem('token'));
  // Checks if there is anything in storeUser and storedToken, if not, initializes with null
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    // useEffect returns nothing of a JWT is not present, terminates function with a return statement
    if (!token) return;
    
    // fetch returns a promise (object which represents completion
    // or failure of an asynchronous operation)
    fetch('https://cf-movies-flix-24da19dbdabb.herokuapp.com/movies', {
      // sent JWT in header of /movies API call
      headers: { Authorization: `Bearer ${token}` }
    })
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
    // callback doesn't depend on changes in props or state
    // Add token as callback to the useEffect function as a dependency array
  }, [token]);

  // Returns the LoginView page if there is not a user signed in
  if (!user) {
    // Pass a prop from MainView with a callback function that will update the current user
    // Callback function assigned to onLoggedIn prop takes parameter user from LoginView and executes setUser to update the mainView user variable
    // use setToken to update the token state with the token retrieved from the API (now a string)
    return ( 
      // If a user is not found, display SignupView in MainView along with the existing LoginView
      // So long as SignupView is imported, this component can be inserted as an element
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user)
          setToken(token)
        }} />
        or 
        <SignupView />
      </>
    );
  }
  
  // sets selectedMovie to null if property onBackClick is actuated by event listener on movie-view
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  
  // returns a statement if the movies array is empty 
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 
  
  return (
    // map method maps each element in the movies array to a piece of the UI
    // This is done by filling and mapping a MovieCard with information from movies
    // Add a button for logout at the bottom of the page with an onClick handler from React
    // onClick handler has a callback function that calls setUser and passes null value
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>
  );

};