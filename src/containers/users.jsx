import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers } from "../actions/users";
import Users from "../components/users.jsx";

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
