/* eslint-disable indent */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import GoBack from '../../common/goBack/GoBack';

import { history } from '../../../helper/history';
import * as routeUrls from '../../../constants/routeUrls';
import * as projectActions from '../../../actions/project.action';

import './createProject.scss';

/**
 * Login component.
 *
 */
class CreateProject extends Component {
  /**
   *Creates an instance of Login.
   *
   * @param {*} props
   * @memberof Login
   */
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      projectDescription: '',
      projectManagerEmail: '',
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
    const { projectName, projectDescription, projectManagerEmail } = this.state;

    if (projectName && projectManagerEmail) {
      this.props.createProject({
        projectName,
        projectDescription,
        projectManagerEmail,
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
              <div className="form-group">
                <label htmlFor="ProjectName">First Name</label>
                <input
                  type="text"
                  name="projectName"
                  className="form-control"
                  id="projectName"
                  placeholder="Project Name"
                  onChange={this.handleChange}
                  value={this.state.projectName}
                />
              </div>
              <label htmlFor="inputEmail1">Project Manager Email</label>
              <input
                type="email"
                name="projectManagerEmail"
                className="form-control"
                id="inputEmail1"
                aria-describedby="emailHelp"
                placeholder="Project Manager email"
                onChange={this.handleChange}
                value={this.state.projectManagerEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description</label>
              <textarea
                name="projectDescription"
                className="form-control"
                id="projectDescription"
                placeholder="Project Description"
                onChange={this.handleChange}
                value={this.state.projectDescription}
              />
            </div>
            {
              // TODO: show error from api.
              Object.keys(this.props.error.projectError).length > 0 &&
                this.state.submitted && (
                  <Alert variant="danger">Failed to create project</Alert>
                )
            }
            {
              // TODO: show error from api.
              this.state.submitted &&
                Object.keys(this.props.error.projectError).length === 0 && (
                  <Alert variant="success">Project Created</Alert>
                )
            }
            <button type="submit" className="btn btn-primary">
              Create project
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
    createProject: (project) => dispatch(projectActions.createProject(project)),
  };
}

CreateProject.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object,
  createProject: PropTypes.func,
};

export default connect(mapStateToProps, mapDisptachToProps)(CreateProject);
