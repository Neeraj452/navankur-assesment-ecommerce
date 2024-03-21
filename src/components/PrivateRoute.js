// /src/components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ redirectTo }) => {
  const auth = JSON.parse(localStorage?.getItem("token"));
  if (auth) {
    return <Outlet />;
  }
  return <Navigate to={redirectTo} replace />;
};
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
