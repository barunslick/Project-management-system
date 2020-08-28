import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routeUrls from '../../constants/routeUrls';

/**
 * Dashboard to view the overall infomration of the system.
 *
 */
function Dashboard() {
  return (
    <div>
      <div className="Dashboard">
        <Link to={routeUrls.ALL_PROJECTS}>View all your projects</Link>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default connect()(Dashboard);
