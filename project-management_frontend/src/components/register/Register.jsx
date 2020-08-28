/* eslint-disable indent */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import GoBack from '../common/goBack/GoBack';

import roles from '../../constants/roles';
import { history } from '../../helper/history';
import * as routeUrls from '../../constants/routeUrls';
import * as userActions from '../../actions/user.action';

import './register.scss';

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
      firstName: '',
      middleName: '',
      lastName: '',
      password: '',
      role: '',
      submitted: false,
    };

    const role = props.user.userDetails.role;

    if (role !== 'admin') {
      history.push('/dashboard');
    }
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

    this.setState({ [name]: value, submitted: false });
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
    const {
      email,
      firstName,
      middleName,
      lastName,
      password,
      role,
    } = this.state;

    if (email && firstName && lastName && role && password) {
      this.props.register({
        email,
        firstName,
        middleName,
        lastName,
        password,
        role,
      });
    }
  };
  /**
   * Renders the login component.
   *
   * @returns {JSX}
   * @memberof Login
   */
  render() {
    return (
      <>
        <GoBack link={routeUrls.DASHBOARD}>DASHBOARD</GoBack>
        <div className="registerForm">
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
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstNameInput">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                id="firstNameInput"
                placeholder="First Name"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleNameInput">Middle Name</label>
              <input
                type="text"
                name="middleName"
                className="form-control"
                id="middleNameInput"
                placeholder="Middle Name"
                onChange={this.handleChange}
                value={this.state.middleName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleNameInput">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                id="lastNameInput"
                placeholder="Last Name"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                id="sel1"
                name="role"
                onChange={this.handleChange}
              >
                {roles.map((role) => (
                  <option key={role.roleId} value={role.roleValue}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>
            {
              // TODO: show error from api.
              Object.keys(this.props.error.registerError).length > 0 &&
                this.state.submitted && (
                  <Alert variant="danger">Registration failed</Alert>
                )
            }
            {
              // TODO: show error from api.
              this.state.submitted &&
                Object.keys(this.props.error.registerError).length === 0 && (
                  <Alert variant="success">User succesfully added</Alert>
                )
            }
            <button type="submit" className="btn btn-primary">
              Create user
            </button>
          </form>
        </div>
      </>
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
    error: state.error,
    user: state.user,
  };
}

/**
 * Take store.dispatch and map it as props to our component.
 *
 * @param {*} dispatch
 */
function mapDisptachToProps(dispatch) {
  return {
    register: (user) => dispatch(userActions.register(user)),
  };
}

Login.propTypes = {
  error: PropTypes.object,
  user: PropTypes.object,
  register: PropTypes.func,
};

export default connect(mapStateToProps, mapDisptachToProps)(Login);
