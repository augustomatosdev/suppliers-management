import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout";

const UnAuthRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector((state) => state.user.authenticated);
  console.log(authenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default UnAuthRoute;
