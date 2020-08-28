import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Renders the homepage.
 *
 * @returns
 */
function Homepage() {
  return (
    <>
      <div>You need to be logged in.</div>
      <Link to="/login">Login</Link>
    </>
  );
}

export default connect()(Homepage);
