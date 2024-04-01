// Create a function component with a form and a submit button.
// Display SignupView on MainView along with LoginView.
// Add input fields to the signup form that match your backend validation logic.

// Import React
import React from 'react';
import { useState } from 'react';

// Import React Bootstrap components for Button and Form
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../../index.scss';

export const SignupView = () => {
  
  // Declare state variables for signup inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  
  // Create a function expression to handle the submission event
  const handleSubmit = (event) => {
    
    // Use event.preventDefault() to prevent the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://cf-movies-flix-24da19dbdabb.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (res.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (

    // Form uses Bootstrap
    <Form onSubmit={handleSubmit}>
      <Form.Group className='form-group' controlID='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength='5'
          required
        />
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control 
          type='date' 
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit' className='primary-button_custom'>
        Submit
      </Button>
    </Form>
  );
};