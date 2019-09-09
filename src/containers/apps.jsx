import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { fetchApps } from '../actions/apps';
import Apps from '../components/Apps';

function mapStateToProps(state) {
  const { items, requesting, error } = state.apps;

  return { error, requesting, items };
}

// eslint-disable-next-line no-unused-vars
function mapDispatchToProps(dispatch, props) {
  return {
    fetchApps: () => dispatch(fetchApps())
  };
}

const AppsPage = props => {
  return (
    <>
      <Helmet>
        <title>Monzo task apps page</title>
        <meta property="og:title" content="Monzo task apps page"></meta>
        <meta
          property="og:description"
          content="Page which displays list of apps belonging to a user"
        ></meta>
      </Helmet>
      <Apps {...props} />
    </>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppsPage)
);
