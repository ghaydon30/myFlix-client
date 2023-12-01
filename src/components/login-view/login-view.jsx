// Import React
import React from 'react';
import { useState } from 'react';
// Import React Bootstrap components for Button and Form
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


// LoginView creates a form with two labels for username and password
// Note that input is it's own element in JSX with the given type properties
// LoginView takes prop onLoggedIn from MainView
export const LoginView = ({ onLoggedIn }) => {
  // Create state variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Create a function expression to handle the submission event
  const handleSubmit = (event) => {
    // Use event.preventDefault() to prevent the default behavior of the form which is to reload the entire page
    event.preventDefault();

    // Create a data object with access and secret keys holding username and password respectively
    const data = {
      Username: username,
      Password: password
    };

    // Send a post (via fetch) to your API /login endpoint (which uses passport) with... 
    // method POST as a string, headers: {"content-Type": "application/json"} and body of data object in JSON string format
    // else alert the user that the login was failed
    fetch('https://cf-movies-flix-24da19dbdabb.herokuapp.com/login', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
      // Convert response from API into a JSON (I thought the API sends as a JSON) 
    }).then((response) => response.json()) 
      .then((data) => {
        // Log data to console, and if you get the user data back, pass the user and token back to MainView through onLoggedIn
        console.log('Login Response: ', data);
        if (data.user) {
          // Use localStorage.setItem(keyName, keyValue) to store the user and token in browser storage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);  
        } else {
          alert('User Not Found');
        }
      })
      // Catch in case an error arrives during the promises
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    // Callback for the onSubmit event of "form". Callback tells Login API to validate username and password
    // handleSubmit is a react hook that will receive the form data if form validation is successful
    // Combine the username and password's mutable state with their component's state creating a "single source of truth"
    // Give inputs property of "value" assigned to react hook "username" from react useState()
    // Give inputs property of "onChange" assigned to a function passed an event and using setUsername() from react useState()
    // in setUsername(), use the event object.target.value, the read-only target property of the Event interface is a reference to the object onto which the event was dispatched
    // Specify both username and password are required using the "required" attribute
    // Add a minlength attribute the the username input of the form
    
    // Form uses Bootstrap
    <Form onSubmit={handleSubmit}>
      <Form.Group controlID='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength='5'
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};