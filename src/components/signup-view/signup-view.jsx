// Create a function component with a form and a submit button.
// Display SignupView on MainView along with LoginView.
// Add input fields to the signup form that match your backend validation logic.

// Import React
import React from 'react';
import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength='5'
          required
          />
        </label>
      <label>
        Password:
        <input 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input 
          type='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input 
          type='date' 
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type='submit'>
        Submit
      </button>
  </form>
  );
};