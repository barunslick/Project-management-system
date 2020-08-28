import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GoBack from '../../common/goBack/GoBack';

import * as routeUrls from '../../../constants/routeUrls';
import * as projectActions from '../../../actions/project.action';

import './projectItem.scss';

/**
 * Class for a single project item.
 *
 */
export class ProjectItem extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.projectId = this.props.match.params.projectId;
    this.project = this.props.currentProject;
  }

  /**
   * Gets neccessary project details on mount.
   */
  componentDidMount() {
    this.props.projectRequest(this.projectId);
  }

  /**
   *
   *
   */
  render() {
    const { currentProject } = this.props;

    return (
      <>
        <GoBack link={routeUrls.ALL_PROJECTS}>PROJECT</GoBack>
        <div className="ProjectItem">
          {currentProject && currentProject.description && (
            <div>
              <p className="ProjectItem__header">
                Project: {currentProject.name}
              </p>
              <p className="ProjectItem__manager">
                Project Manager: {currentProject.manager.email}
              </p>

              <div className="ProjectItem__description">
                <p className="ProjectItem__description-heading">Description</p>
                <p className="ProjectItem__description-deatails">
                  {currentProject.description}
                </p>
              </div>
            </div>
          )}
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
    currentProject: state.projects.currentProject,
  };
}

/**
 * Take store.dispatch and map it as props to our component.
 *
 * @param {*} dispatch
 */
function mapDisptachToProps(dispatch) {
  return {
    projectRequest: (id) => dispatch(projectActions.getProjectById(id)),
  };
}

ProjectItem.propTypes = {
  match: PropTypes.object,
  currentProject: PropTypes.object,
  projectRequest: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withRouter(ProjectItem));
