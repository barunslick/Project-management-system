import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Dashboard component to give an overview of all user projects.
 *
 * @class Dashboard
 * @augments {Component}
 */
class Dashboard extends Component {
  /**
   * Renders the dashboard component.
   *
   * @returns
   * @memberof Dashboard
   */
  render() {
    return <div> Hello welcome</div>;
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
  };
}

/**
 * Take store.dispatch and map it as props to our component.
 *
 * @param {*} dispatch
 */
function mapDisptachToProps(dispatch) {
  return {};
}

Dashboard.propTypes = {};

export default connect(mapStateToProps, mapDisptachToProps)(Dashboard);
