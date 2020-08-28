import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import * as userActions from '../../actions/user.action';

import './header.scss';

/**
 * A header component that shows the users name and role.
 *
 * @param {Object} props
 */
function Header(props) {
  const { user } = props;

  const handleLogout = () => {
    userActions.userLogout();
    props.logout();
  };

  return (
    <div className="Header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 col-md-8">
            <h1>Welcome {user.userDetails.firstName}</h1>
          </div>
          <div className="col-lg-2 col-md-4">
            <DropdownButton id="dropdown-item-button" title="" size="sm">
              <Dropdown.Item as="button" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
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

/**
 * Take store.dispatch and map it as props to our component.
 *
 * @param {*} dispatch
 */
function mapDisptachToProps(dispatch) {
  return {
    logout: () => dispatch(userActions.logout()),
  };
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDisptachToProps)(Header);
