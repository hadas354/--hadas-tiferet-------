/* eslint-disable react/prop-types */
// NavigationBar.jsx
//import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'

const NavigationBar = ({ id, logout }) => {
  return (
    <nav>
      <Link to={`/users/${id}/info`}>Info</Link>
      <Link to={`/users/${id}/todos`}>Todos</Link>
      <Link to={`/users/${id}/posts`}>Posts</Link>
      <Link to={`/users/${id}/albums`}>Albums</Link>
      <a onClick={logout}>Logout</a>
    </nav>
  );
};

export default NavigationBar;
