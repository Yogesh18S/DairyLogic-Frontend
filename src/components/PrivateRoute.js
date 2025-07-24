import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if user is authenticated
const isAuthenticated = (token) => {
  if (!token) {
    console.log("no token");
    return false;
  }

  try {
    // Decode the JWT token to get the payload
    const decodedToken = jwtDecode(token);

    // Get the expiration time from the token (exp is in seconds)
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now(); // Get current time in milliseconds

    // Return false if the token is expired
    return expirationTime > currentTime;
  } catch (e) {
    console.error(e);
    return false; // If there's an error in decoding or an invalid token, consider it expired
  }
};

// Function to check if the user has the required role
const userHasRequiredRole = (token, allowedRoles) => {
  // Decode the JWT token to get the user's roles
  const decodedToken = jwtDecode(token);
  const userRoles =  decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || []; // Get roles from the token, default to empty array

  console.log(decodedToken);
  console.log("required roles: "+ allowedRoles );
  console.log("user roles: "+ userRoles);

  return allowedRoles.some(role => userRoles.includes(role));
};

const PrivateRoute = ({ element: Element, allowedRoles , ...rest }) => {

  const token = localStorage.getItem('access_token');

  if (!isAuthenticated(token)) {
    console.log("token expired");
    // If the token is expired or missing, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (!userHasRequiredRole(token, allowedRoles)) {
    // If the user doesn't have the allowed role(s), redirect to an unauthorized page
    return <Navigate to="/401" replace />;
  }

  return <Element {...rest} />
};

export default PrivateRoute;