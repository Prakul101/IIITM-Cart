import React from "react";
import { Redirect, Route } from "react-router";
import { isAuthenticated } from "./index";

const genRoute = (Component, path, check, rest) => (
  <Route
    {...rest}
    render={(props) =>
      check ? <Component {...props} /> : <Redirect to={path} />
    }
  />
);

export const PrivateRoute = ({ component, ...rest }) =>
  genRoute(
    component,
    "/login",
    isAuthenticated() && isAuthenticated().user.role === 0,
    rest
  );

export const NonLoginRoute = ({ component, ...rest }) => {
  const path =
    isAuthenticated() && isAuthenticated().user.role === 0
      ? "/user/dashboard"
      : "/admin/dashboard";

  return genRoute(component, path, !isAuthenticated(), rest);
};

export const NonAdminRoute = ({ component, ...rest }) =>
  genRoute(
    component,
    "/admin/dashboard",
    !isAuthenticated() ||
      (isAuthenticated() && isAuthenticated().user.role === 0),
    rest
  );

export const AdminRoute = ({ component, ...rest }) =>
  genRoute(
    component,
    "/login",
    isAuthenticated() && isAuthenticated().user.role === 1,
    rest
  );
