import React from "react";

// Import styling from movie-view.scss
import '../../index.scss';

export const UserInfo = ({ email, name }) => {

  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </>
  )
}