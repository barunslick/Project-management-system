import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './header.scss';
/**
 * A header component that shows the users name and role.
 */
function Header({ user }) {
  return (
    <div className="Header">
      <h1>Welcome {user.userDetails.firstName}</h1>
    </div>
  );
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

Header.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps, null)(Header);
