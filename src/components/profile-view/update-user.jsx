import React from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

// Import styling from movie-view.scss
import '../../index.scss';

// setUsername, setPassword, setEmail, setBirthday

export const UpdateUser = ({ 
  handleUpdate, 
  username, 
  password, 
  email, 
  birthday, 
  setUsername, 
  setPassword, 
  setEmail, 
  setBirthday }) => {
  
  return (
    <>  
      <h4>Update</h4>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlID='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // onChange={(e) => handleUpdate(e)}
            minLength='5'
            // required
            placeholder='Enter a Username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={(e) => handleUpdate(e)}
            // required
            placeholder='Enter a Password'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={(e) => handleUpdate(e)}
            // required
            placeholder='Enter an Email'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control 
            type='date' 
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            // onChange={(e) => handleUpdate(e)}
            // required
            placeholder='Enter Corrected Birthday'
          />
        </Form.Group>
        <Button variant='primary' className='primary-button_custom' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
    
/* 
    <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
      <h2>Want to change some info?</h2>
      <label>Username:</label>
      <input 
        type='text'
        name='username'
        defaultValue={user.Username}
        onChange={e => handleUpdate(e)} 
      />
      <label>Password</label>
      <input 
        type='password'
        name='password'
        defaultValue={user.Password}
        onChange={e => handleUpdate(e)}
      />
      <label>Email Address</label>
      <input 
        type='email'
        name='email'
        defaultValue={user.Email}
        onChange={e => handleUpdate(e)}
      />
      <button variant='primary' type='submit'>
        Update
      </button>
    </form>
  )
}; */