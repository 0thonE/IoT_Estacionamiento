import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./useAuth";

const PrivateRoute = ({ users = [], children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(`currentU`, currentUser)

  if (users.length > 0 && !users.find(user => currentUser?.multiFactor?.user?.email?.includes(user))) {
    return <Navigate to="/" />
  }

  return !!currentUser ? children : <Navigate to="/login" />;
};


export default PrivateRoute