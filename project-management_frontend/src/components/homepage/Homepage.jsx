import React from 'react';

import { connect } from 'react-redux';
/**
 * Renders the homepage.
 *
 * @returns
 */
function Homepage() {
  return <div>You need to be logged in.</div>;
}

export default connect()(Homepage);
