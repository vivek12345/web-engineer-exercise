import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authenticate } from "../actions/sign-in";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(event) {
    const { type, value } = event.target;
    this.setState({ [type]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    await this.props.authenticate(email, password);

    this.props.redirect("/apps");
  }

  render() {
    return (
      <form id="sign-in" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          placeholder="Email address"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <input
          onChange={this.handleChange}
          placeholder="Password"
          type="password"
        />
        <input type="submit" />
      </form>
    );
  }
}

const mapStateToProps = (state, router) => {
  const { error, requesting } = state.signIn;
  const redirect = router.history.push;

  return { error, requesting, redirect };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    authenticate: (email, password) => dispatch(authenticate(email, password))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
