import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, isLoggedIn }) => {

  if (localStorage.getItem("token") && localStorage.getItem("LoginIn")){
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes