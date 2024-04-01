// CHILD COMPONENT IMPORTS, note they must have capitalized names!
// The location is not required to have the ".jsx" at the end

// `useState` is a react hook that adds state to functional components
  // Returns an array with two elements, the current state value and a function allowing state update
import { useState } from 'react';

// useEffect is a react hook that performs side effects in functional components
  // It takes two arguments: a function that contains the code for the side effect and an optional dependency array
import { useEffect } from 'react';

// React Bootstrap is a native bootstrap rebuild in react for front-end styling
import { Row, Col, Button } from 'react-bootstrap';

// React Router handles routing in react applications by allowing you to define and navigate between different views or components based on the URL
  // BrowserRouter component uses the HTML5 history API for clean URLs
  // Route component renders a component when the path matches the current URL
  // `Routes` allows you to nest `Route` components
  // `Navigate` allows you to change the url and navigate to different locations within your app and render without requiring a page reload
    // `Navigate` can be nested in other components and used in conjunction with logic to react, it should be used within the Route component
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// IMPORTS FROM APP COMPONENTS

// Handles making of a movie card itself
// Will contain button for adding movie to favorite list
import { MovieCard } from '../movie-card/movie-card';
// Handles view an individual movie view displaying a larger photo and more detail
import { MovieView } from '../movie-view/movie-view';
// Handles login form for user, sets a user and token into "localStorage"
import { LoginView } from '../login-view/login-view';
// Handles signup for for user, posts the submitted user to the API endpoint
import { SignupView } from '../signup-view/signup-view';
// Navigation bar at the top of every page using `Navbar` from react-bootstrap
import { NavigationBar } from '../navigation-bar/navigation-bar';
// View displays user info, allows info update / deregister, and displays favorite movies
import { ProfileView } from '../profile-view/profile-view';
// debounce allows for delays after user inputs to search
import { debounce } from 'lodash';

// Export MainView component for use in index.js, MainView is the highest level parent component
export const MainView = () => {
  
  // movies is the state variable (set to an empty array initially), setMovies updates the contents of the movies state variable array
  const [movies, setMovies] = useState([]);
  
  // Use stored values (in localStorage) as default values of user and token states (what we got from the back end)
  // JSON.parse is a JavaScript function converting a JSON formatted string into a JavaScript Object
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  
  // State variables for user and token
  // Checks if there is anything in storeUser and storedToken, if not, initializes with null
  // must come after variables storedUser and storedToken
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  // State variables for movie search function
  const [searchKey, setSearchKey] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  // useEffect argument 1 is an arrow function containing `MainView` logic
  // Argument 2 is an array containing the string [token], when changed, this re-runs useEffect
  useEffect(() => {
    
    // useEffect returns nothing of a JWT is not present, terminates function with a return statement
    // `token` is a state variable in string form set above
    if (!token) {
      return;
    };

    // fetch function sends an API request to the API & returns a promise object or
    // or failure of an asynchronous operation
    fetch('https://cf-movies-flix-24da19dbdabb.herokuapp.com/movies', {
      // the headers property is part of the configuration object passed as the second argument to the fetch function
      // headers contains key-value pairs, sending an authorization header with a template literal ``
      // Template literal contains the token variable, bearer indicates a bearer token that allows access to the user
      headers: { Authorization: `Bearer ${token}` }
    })
    // .then method passed promise object from fetch
    // .then converts fetch promise response object to JSON object
    .then((response) => response.json())
    // 1st .then function passes callback (json object) to 2nd .then
    .then((data) => {
    // moviesFromApi variable set to doc array made using map function
    // .map() creates array with returned key value pairs defined below (from data object)
      console.log(data);
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
      // to state of your component (moviesFromApi array variable with all key value pairs)
      setMovies(moviesFromApi);
      setFilteredMovies(moviesFromApi);
    });
    // callback doesn't depend on changes in props or state
    // Add token as callback to the useEffect function as a dependency array, effect will run whenever token is changed
    // Were the dependency array empty, the effect runs once after the initial render
    // Omitted dependency array means the effect would run after every render
  }, [token]);

  // Code to add a favorite movie to the user list
  const addFav = (id) => {
    fetch(`https://cf-movies-flix-24da19dbdabb.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert('Failed to add');
      }
      }).then((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  // Code to delete a favorite movie to the user list
  const deleteFav = (id) => {
    fetch(`https://cf-movies-flix-24da19dbdabb.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert('Failed to add');
      }
      }).then((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  // Code to handle a search input
  const handleSearch = (search) => {
    setSearchKey(search.target.value);
    movieSearch(search.target.value);
  };
  const movieSearch = debounce((searchKey) => {
    const tempMovieFilter = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchKey.toLowerCase())
    });
    setFilteredMovies(tempMovieFilter);
  }, 400);

  // return statement for MainView, contains routing for all views
  return (
    // `BrowserRouter` is the high level component of the routing functionality
    <BrowserRouter>
      {/* 
        NavigationBar is a component that is always displayed 
        It is passed two props, user and onLoggedOut, an arrow function which sets the user and JWT to null
      */}
      <NavigationBar 
        user={user} 
        onLoggedOut={() => {
          setUser(null)
          setToken(null)
        }}
      />
      
      {/* Row provides bootstrap styling to justify content center */}
      <Row className='justify-content-md-center'>
        {/* Routes holds individual `Route` Components */}
        <Routes>
          
          {/* SIGNUP ROUTE */}
          <Route 
            // Path contains a string that when matched to the URL, will render the components contained in `element`
            path='/signup'
            element={
              <>
                {/* 
                  Ternary operator used here to check if the user is truthy or falsy
                  The first () will be executed if true, the second if false
                 */}
                {user ? (
                  // Take them to the main page of the app if a user is present
                  <Navigate to='/' />
                ) : (
                  // If user is falsy (null) display `SignupView` in a Col 5/12's of the page
                  <Col md={5}>
                    <SignupView/>
                  </Col>
                )}
              </>
            }
          />
        
          {/* LOGIN ROUTE */}
          <Route 
            // Path to render login page (`LoginView` component)
            path='/login'
            element={
              <>
                {/* If the user is present, navigate to main page */}
                {user ? (
                  <Navigate to='/' />
                  ) : (
                    // Otherwise display LoginView with prop onLoggedIn
                    /* 
                      This function called in LoginView updates the user and token state variables 
                      using setUser and setToken. The updates come from an API call to the back end
                      given that the user's login credentials are correct on the LoginView form
                    */ 
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user)
                        setToken(token)
                      }} />
                    </Col>
                  )}
              </>
            }
          />
          
          {/* MovieView ROUTE */}
          <Route 
            // NOTE: the :MovieID endpoint, you needed a capital M, look into exactly why (Back end)
            path='/movies/:MovieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                  // returns a statement if the movies array is empty 
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  // sets selectedMovie to null if property onBackClick is actuated by event listener on movie-view
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          
          {/* ALL MOVIES MAIN PAGE ROUTE */}
          <Route 
            path='/'
            element={
              <>
                {!user ? (
                  // The `replace` prop is passed here to eliminate the previous page from router history
                  // This means when going back the user will skip the page before login
                  <Navigate to='/login' replace />
                  // returns a statement if the movies array is empty 
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Col className='search-entry' md={12}>
                      <input
                        type='text'
                        value={searchKey}
                        onChange={handleSearch}
                        placeholder='Search movies...'
                      />
                    </Col>
                    <>
                      {filteredMovies.map((movie) => (
                        // Key attribute required for recurring same-type elements in succession in react
                        <Col className='mb-5' key={movie.id} md={3}>
                          <MovieCard 
                            // The movie object is passed to MovieCard as a Prop
                            movie={movie}
                            addFav={addFav}
                            deleteFav={deleteFav}
                            user={user}
                          />
                        </Col>
                      ))}
                      {/* Add a button for logout at the bottom of the page with an onClick handler from React */}
                      {/* onClick handler has a callback function that calls setUser and setToken and passes null value */}
                      <Button variant='primary' className='primary-button_custom' onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    </>
                  </>
                  
                )}
              </>
            }
          />
          
          {/* PROFILE VIEW PAGE */}
          <Route
            path='/profile'
            element={
              <>
                {!user ? (
                  // The `replace` prop is passed here to eliminate the previous page from router history
                  // This means when going back the user will skip the page before login
                  <Navigate to='/login' replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                    addFav={addFav}
                    deleteFav={deleteFav}
                  /> 
                )}
              </> 
            }
          />
          
        </Routes>
      </Row>
    </BrowserRouter>
  )
};