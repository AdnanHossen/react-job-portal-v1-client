import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  // auth context
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);

  // loading state true
  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  // user === true
  if (user) {
    return children;
  }

  // return code
  return <Navigate to="/login" state={location?.pathname}></Navigate>;
};

export default PrivateRoute;
