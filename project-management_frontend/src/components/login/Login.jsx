/* eslint-disable indent */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../../actions/user.action';

import './login.scss';

/**
 * Login component.
 *
 */
class Login extends Component {
  /**
   *Creates an instance of Login.
   *
   * @param {*} props
   * @memberof Login
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
    };
  }

  /**
   * Maps input value to state values.
   *
   * @param {Event} e
   * @memberof Login
   */
  handleChange = (e) => {
    // Get the name value pair of target whether it is email or password
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  /**
   * Make login request upon submitting.
   *
   * @param {*} e
   * @memberof Login
   */
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;

    if (email && password) {
      this.props.loginRequest(email, password);
    }
  };
  /**
   * Renders the login component.
   *
   * @returns {JSX}
   * @memberof Login
   */
  render() {
    const loginError = this.props.error;

    return (
      <div className="loginForm">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          {loginError.authenticationError &&
            !this.props.user.isLoggingIn &&
            this.state.submitted && (
              <div className="loginForm__error">Login failed</div>
            )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

/**
 * Sends required data from state to props of component.
 *
 * @param {Object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    error: state.error,
  };
}

/**
 * Take store.dispatch and map it as props to our component.
 *
 * @param {*} dispatch
 */
function mapDisptachToProps(dispatch) {
  return {
    loginRequest: (email, password) =>
      dispatch(userActions.login(email, password)),
  };
}

Login.propTypes = {
  loginRequest: PropTypes.func,
  error: PropTypes.object,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDisptachToProps)(Login);
