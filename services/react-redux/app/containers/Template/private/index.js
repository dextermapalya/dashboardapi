import React, { Component } from 'react';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Log from 'logger-init';

export default class PrivateLayout extends Component {
  constructor(props) {
    super(props);
    // this.userActions = new UserActions(this.props.dispatch);
    this.state = {
      active: false,
      // isLoggedIn: false,
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue = (value) => {
    this.setState({
      active: value,
    });
  };

  render() {
    /* eslint-disable no-shadow */
    const {
      Component, route, user, isLoggedIn
    } = this.props;
    Log.info('IS LOGGEDIN !!!', isLoggedIn);
    if (!isLoggedIn) {
      return (<Redirect to="/" />);
    }
    const { active } = this.state;

    /* const Component = this.props.component;
        const route = this.props.route;
        const user = this.props.user;
        const userActions = this.props.userActions; */
    return (
      <div className="app-wrapper ">
        <div
          id="wrapper_body"
          className={active ? 'mini-navbar pace-done' : 'side-navbar pace-done'}
        >
        <Sidebar />
          <div id="page-wrapper" className="gray-bg">
            <Header updateParent={this.updateValue} />
            <div className="wrapper wrapper-content wrapper_data animated fadeInRight">
              <Component user={user} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrivateLayout.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isLoggedIn: PropTypes.bool,
  route: PropTypes.object,
  Component: PropTypes.any,
  // location: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
