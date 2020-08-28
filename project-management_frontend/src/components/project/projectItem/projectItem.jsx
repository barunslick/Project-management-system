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
    this.props.getProjectMembers(this.projectId);
  }

  /**
   *
   *
   */
  render() {
    const { currentProject = {}, projectMembers = [] } = this.props;

    return (
      <>
        <GoBack link={routeUrls.ALL_PROJECTS}>PROJECT</GoBack>
        <div className="ProjectItem">
          <div>
            {currentProject && currentProject.manager && (
              <>
                <p className="ProjectItem__header">
                  Project: {currentProject.name}
                </p>
                <p className="ProjectItem__manager">
                  Project Manager: {currentProject.manager.email}
                </p>
              </>
            )}
            {currentProject && currentProject.description && (
              <div className="ProjectItem__description">
                <p className="ProjectItem__description-heading">Description</p>
                <p className="ProjectItem__description-deatails"></p>
              </div>
            )}
          </div>
          {currentProject && projectMembers && (
            <div className="ProjectMembers">
              <p className="ProjectMembers__heading">Members</p>
              <div>
                {projectMembers.map((user) => (
                  <div key={user.id} className="ProjectMembers__user">
                    {user.first_name} {user.last_name}
                  </div>
                ))}
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
    currentProject: state.projects.currentProject,
    projectMembers: state.projects.projectMembers,
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
    getProjectMembers: (id) => dispatch(projectActions.getProjectMembers(id)),
  };
}

ProjectItem.propTypes = {
  match: PropTypes.object,
  currentProject: PropTypes.object,
  projectRequest: PropTypes.func,
  projectMembers: PropTypes.array,
  getProjectMembers: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withRouter(ProjectItem));
