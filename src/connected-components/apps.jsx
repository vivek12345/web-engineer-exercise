import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchApps } from "../actions/apps";

function Apps({ error, items, fetchApps }) {
  if (!items || !items.length) {
    fetchApps();
    return <div>LOADING APPS...</div>;
  }

  return (
    <ul id="apps">
      {items.map(({ id, name, logo }) => {
        return (
          <li class="app">
            <Link to={`/apps/${id}`}>
              <p>{name}</p>
              <img src={logo} alt={name} width="100" height="100" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function mapStateToProps(state) {
  const { items, error } = state.apps;

  return { error, items };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchApps: () => dispatch(fetchApps())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Apps)
);
