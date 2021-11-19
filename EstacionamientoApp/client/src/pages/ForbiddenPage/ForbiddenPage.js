import React from 'react';
// import { Button, Content } from 'carbon-components-react';
// import {
//   Login16 as Login,
// } from "@carbon/icons-react";

import { useLocation } from 'react-router-dom';
import useAuth from "../../state/useAuth";



const ForbiddenPage = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <div>
        <h3 className="page-header__title">User not authenticated</h3>
        <br />
        <br />
        Please login to access this page and try again.<br /><br />
        {/* <Button className="session__btn" renderIcon={Login}
          onClick={() => { window.location = 'auth/login' }} >Login</Button> */}
      </div>
    );


  return (
    <div>
      <h3 className="page-header__title">Forbidden</h3>
      <br />
      <br />
      Your requested to access page
      <span className="forbidden-page__path"> {location.pathname} </span>
      has been denied, please login as a user with permission to access this page.
    </div>
  );
};

export default ForbiddenPage;
