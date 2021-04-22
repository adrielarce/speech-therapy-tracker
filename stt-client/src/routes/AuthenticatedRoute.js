import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  return (
    <Route {...rest}>
      {rest.isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
