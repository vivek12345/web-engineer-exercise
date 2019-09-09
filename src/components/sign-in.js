import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from './Form';
import { Button } from './Button';
import { Alert } from './Alert';
import { ERROR_MESSAGES } from '../constants';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  async handleSubmit(values) {
    const { email, password } = values;
    await this.props.authenticate(email, password);
    !this.props.error && this.props.redirect('/apps');
  }

  render() {
    const { email, password } = this.state;
    const { error, requesting, globalError } = this.props;

    return (
      <div className="pt-48">
        {globalError ? (
          <Alert appearance={'info'} className="max-w-sm mx-auto mb-5">
            <span>{globalError}</span>
          </Alert>
        ) : null}
        <div className="max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
          <div className="relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="absolute h-auto w-full object-cover"
              src="https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
              alt="my zomato"
            />
          </div>
          <div className="w-full xl:w-1/2 p-8">
            <Form
              id="sign-in"
              onSubmit={this.handleSubmit}
              initialValues={{ email, password }}
            >
              <h1 className=" text-2xl font-bold">Sign in to your account</h1>
              <div className="mb-4 mt-8">
                <Form.Input
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email address"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  required={true}
                />
              </div>
              <div className="mb-4 mt-8">
                <Form.Input
                  label="Password"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required={true}
                />
              </div>
              <div className="mt-1">
                {error ? (
                  <span className="error text-red-600">
                    {ERROR_MESSAGES.INCORRECT_CREDENTIALS}
                  </span>
                ) : null}
              </div>
              <div className="flex mt-12">
                <Button type="submit" full={true} loading={requesting}>
                  Sign In
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  authenticate: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  error: PropTypes.bool,
  requesting: PropTypes.bool,
  globalError: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

SignIn.defaultPropTypes = {
  error: false,
  requesting: false,
  globalError: null
};
