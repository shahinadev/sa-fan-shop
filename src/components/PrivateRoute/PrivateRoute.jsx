import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import Loading from "./../shared/Loading/Loading";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
