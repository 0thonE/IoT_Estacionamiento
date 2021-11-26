
import React, { useCallback, useContext } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import app from "../../state/base.js";
import { AuthContext } from "../../state/useAuth";



const Login = () => {


  const navigate = useNavigate();
  const handleLogin = useCallback(
    async event => {
      const { email, password } = event.target.elements;
      if (!email.value?.includes('@iop.com')) {
        email.value += '@iop.com';
      }
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    },
    [navigate]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page">
      {/* <Content > */}
      <div className="login-wrapper">

        <h1>Log in</h1><br /><br />
        <form onSubmit={handleLogin}>
          <label>
            Email<br />
            <input name="email" /* type="email" */ placeholder="Email" />
          </label><br /><br />
          <label>
            Password<br />
            <input name="password" type="password" placeholder="Password" />
          </label><br /><br />
          <button type="submit">Log in</button>
        </form>
      </div>

      {/* </Content> */}
    </div>
  );
};

export default Login;