/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './LandingPage.jsx';
import DashBoard from './DashBoard.jsx';

/**
 * HomePage - Serve either Landing page or users dashboard
 */
class HomePage extends React.Component {
  /**
   * initates the sidebar
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * renders either the Landing page or user'sdashboard
   * @return {any}
   */
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated ? <DashBoard /> : <LandingPage />}
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(HomePage);
