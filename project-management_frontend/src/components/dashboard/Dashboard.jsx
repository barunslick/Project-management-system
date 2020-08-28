import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routeUrls from '../../constants/routeUrls';

import './dashboard.scss';

/**
 * Dashboard to view the overall infomration of the system.
 *
 * @param {Object} props
 */
function Dashboard(props) {
  const userRole = props.user.userDetails.role;

  return (
    <div>
      <div className="Dashboard">
        <Link to={routeUrls.ALL_PROJECTS}>View all projects</Link>
      </div>
      {userRole === 'admin' && (
        <div className="AdminPanel">
          <h4>Admin actions</h4>
          <p>
            <Link to={routeUrls.CREATE_PROJECT}>Create Project</Link>
          </p>
          <p>
            <Link to={routeUrls.REGISTER}>Register User</Link>
          </p>
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {};

/**
 * Sends required data from state to props of component.
 *
 * @param {Object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

Dashboard.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps, null)(Dashboard);
