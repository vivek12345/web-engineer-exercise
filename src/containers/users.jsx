import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/users';
import Users from '../components/Users';

function mapStateToProps(state, router) {
  const { items, requesting, error } = state.users;
  const appId = router.match.params.id;

  return { error, requesting, items, appId };
}

function mapDispatchToProps(dispatch, router) {
  return {
    fetchUsers: params => dispatch(fetchUsers(router.match.params.id, params))
  };
}

const UsersPage = props => {
  return (
    <>
      <Helmet>
        <title>Monzo task users list page</title>
        <meta property="og:title" content="Monzo task users list page"></meta>
        <meta
          property="og:description"
          content="Page which displays the paginated list of users for an"
        ></meta>
      </Helmet>
      <Users {...props} />
    </>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersPage)
);
