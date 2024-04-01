import React from 'react';

// import MovieCard for use in fav movie list
import { MovieCard } from '../movie-card/movie-card';

// `useState` is a react hook that adds state to functional components
  // Returns an array with two elements, the current state value and a function allowing state update
  // For use in state variable to alter the user
import { useState } from 'react';

// Imports for react bootstrap formatting
// REVIEW: CHECK IF YOU ACTUALLY NEED FORM AND BUTTON HERE
import {Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

// imports for individual components that will make up the profile view
// `UserInfo` is a simple page that displays a few pieces of data about the user
import { UserInfo } from './user-info';
// import { UpdateUser } from './update-user';
// import { FavoriteMovies } from './favorite-movies';

// Import styling from movie-view.scss
import '../../index.scss';

export const ProfileView = ({ movies, user, token, setUser, addFav, deleteFav }) => {
  
  // State Variables to Change User
  const [username, setUsername] = useState(user.name || '');
  const [password, setPassword] = useState(user.password || '');
  const [email, setEmail] = useState(user.email || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  

  // REVIEW: Fav Movies List (experiment with _id and id)
  const favoriteMovieList = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  // UPDATE ACCOUNT
  const handleUpdate = (event) => {
    // Prevent default behavior of form to reload page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://cf-movies-flix-24da19dbdabb.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(async (res) => {
      if (res.ok) {
        const updatedUser = await res.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Update was successful");
        window.location.reload();
    } else {
        const errorText = await response.text();
        console.log("Error response:", errorText);
      alert('Update failed');
    }
      }).catch((e) => {
        console.log('Error: ', e);
        alert('Something went wrong');
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (confirm("Are you sure?") == false) {
      alert("Deletion cancelled");
      return;
    } else {
      fetch(`https://cf-movies-flix-24da19dbdabb.herokuapp.com/users/${user.Username}` , {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        if (res.ok) {
          alert('User has been deleted')
          setUser(null);
          localStorage.clear();
          window.location.reload();
        } else {
          alert('Delete Failed.')
        }
      }).catch((e) => {
        console.log('Error: ', e);
        alert('Something went wrong');
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <>
            <h4>Update</h4>
            <Form>
              <Form.Group className='form-group' controlID='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // onChange={(e) => handleUpdate(e)}
                  minLength='5'
                  required
                  placeholder='Enter a Username'
                />
              </Form.Group>
              <Form.Group className='form-group'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // onChange={(e) => handleUpdate(e)}
                  required
                  placeholder='Enter a Password'
                />
              </Form.Group>
              <Form.Group className='form-group'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // onChange={(e) => handleUpdate(e)}
                  required
                  placeholder='Enter an Email'
                />
              </Form.Group>
              <Form.Group className='form-group'>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type='date'
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  // onChange={(e) => handleUpdate(e)}
                  required
                  placeholder='Enter Corrected Birthday'
                />
              </Form.Group>

              <Row>
                <Col>
                  <Button
                    variant='primary'
                    className='primary-button_custom'
                    type='submit'
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    variant='primary'
                    className='primary-button_custom'
                    type='submit'
                    onClick={handleDelete}
                  >
                    Delete Account
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        </Col>
      </Row>

      <Row>
        <h1 className='mt-5 text-center custom-title_navlink'>
          Favorite Movies
        </h1>
      </Row>

      <Row>
        {favoriteMovieList.length == 0 ? (
          <h2 className='mt-5 text-center'>No Movies to Display</h2>
        ) : (
          <>
            {favoriteMovieList.map((movie) => (
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
          </>
        )}
      </Row>
    </Container>
  );
};

