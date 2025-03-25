// import React from 'react'
import { Link } from 'react-router-dom';

export const NotAdmin = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content" >
        <h1 className="not-found-title">You Are Not An Admin</h1>
        <p className="not-found-message">
          It seems you are trying to Access Admin Page ,The page you are looking for is required Admin Access.
        </p>
        <Link to="/AdminLogin" className="not-found-home-link">
          <button className="not-found-button">Login as Admin</button>
        </Link>
      </div>
      <div className="not-found-animation"></div>
    </div>
  );
}
