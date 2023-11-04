import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, isLoggedIn }) => {

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes