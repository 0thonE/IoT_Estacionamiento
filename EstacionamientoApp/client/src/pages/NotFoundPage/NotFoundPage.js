import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();


  return (
    <div>
      <h3 className="page-header__title">Not found</h3>
      <br />
      <br />
      The requested page
      <span className="not-found-page__path"> {location.pathname} </span>
      doesn't exist.
    </div>
  );

}

export default NotFoundPage;

