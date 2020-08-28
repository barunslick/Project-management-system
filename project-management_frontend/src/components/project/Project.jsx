import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import GoBack from '../common/goBack/GoBack';

import * as routeUrls from '../../constants/routeUrls';
import * as projectActions from '../../actions/project.action';

import './project.scss';
import { ListGroupItem } from 'react-bootstrap';

/**
 * Displays the project user in involved in.
 *
 * @class Project
 * @augments {Component}
 */
class Project extends Component {
  /**
   * Fetches all the projects of user on mount.
   */
  componentDidMount() {
    this.props.projectRequest();
  }
  /**
   * Renders the dashboard component.
   *
   * @returns
   * @memberof Project
   */
  render() {
    const projects = this.props.projects.projectsList || {};

    return (
      <>
        <GoBack link={routeUrls.DASHBOARD}>DASHBOARD</GoBack>
        <div className="Projects">
          <h3>Projects</h3>
          <ListGroup variant="flush">
            {Object.entries(projects).map((project) => (
              <ListGroupItem key={project[1].id}>
                <Link to={`${routeUrls.ALL_PROJECTS}/${project[1].id}`}>
                  {project[1].name}
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
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
    projects: state.projects,
  };
}

/**
 * Take store.dispatch and map it as props to our component.
 *
 * @param {*} dispatch
 */
function mapDisptachToProps(dispatch) {
  return {
    projectRequest: () => dispatch(projectActions.getProjects()),
  };
}

Project.propTypes = {
  projectRequest: PropTypes.func,
  projects: PropTypes.object,
};

export default connect(mapStateToProps, mapDisptachToProps)(Project);
