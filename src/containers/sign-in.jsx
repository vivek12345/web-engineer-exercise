import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from '../components/sign-in';

import { authenticate } from '../actions/sign-in';

const mapStateToProps = (state, router) => {
  const { error, requesting } = state.signIn;
  const { globalError } = state.errors;
  const redirect = router.history.push;

  return { error, globalError, requesting, redirect };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, props) => {
  return {
    authenticate: (email, password) => dispatch(authenticate(email, password))
  };
};

const SignInPage = props => {
  return (
    <>
      <Helmet>
        <title>Monzo task sign in page</title>
        <meta property="og:title" content="Monzo task sign in page"></meta>
        <meta
          property="og:description"
          content="Page which displays the sign in page for monzo"
        ></meta>
      </Helmet>
      <SignIn {...props} />
    </>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInPage)
);
