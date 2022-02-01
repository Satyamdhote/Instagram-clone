import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Route } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
