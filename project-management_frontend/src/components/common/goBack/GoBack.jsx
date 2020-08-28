import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Made a seperate component for this as it makes it easy to style it later.

/**
 * Goes back to defiend route.
 *
 * @param {Object} props
 */
function GoBack(props) {
  return (
    <div className="GoBack">
      <Link to={props.link}>
        {'\u2190'}
        {props.children}
      </Link>
    </div>
  );
}

GoBack.propTypes = {
  link: PropTypes.string,
  children: PropTypes.string,
};

export default GoBack;
