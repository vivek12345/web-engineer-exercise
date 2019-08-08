import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers } from "../actions/users";

function buildPagination(id, page = 0) {
  return (
    <ul class="nav">
      <li>
        <Link to={`/apps/${id}/${page}`}>Previous</Link>
      </li>
      <li>
        <Link to={`/apps/${id}/${page}`}>Next</Link>
      </li>
    </ul>
  );
}

function Users({ error, items, fetchUsers, appId }) {
  if (!items || !items.length) {
    fetchUsers();
    return <div>LOADING USERS...</div>;
  }

  return (
    <div id="users">
      {buildPagination(appId)}
      <ul>
        {items.map(({ id, name, email, avatar }) => {
          return (
            <li>
              <p>Name: {name}</p>
              <p>
                Email: <a href={`mailto:${email}`}>{email}</a>
              </p>
              <img src={avatar} alt={name} width="50" height="50" />
            </li>
          );
        })}
      </ul>
      {buildPagination(appId)}
    </div>
  );
}

function mapStateToProps(state, router) {
  const { items, error } = state.users;
  const appId = router.match.params.id;

  return { error, items, appId };
}

function mapDispatchToProps(dispatch, router) {
  return {
    fetchUsers: () => dispatch(fetchUsers(router.match.params.id))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
