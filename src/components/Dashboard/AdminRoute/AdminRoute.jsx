import React from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";
import useAuth from "./../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { isAdmin, adminLoading } = useAuth();
  if (adminLoading) return <Loading />;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default AdminRoute;
