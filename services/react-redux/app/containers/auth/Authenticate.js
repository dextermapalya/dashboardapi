/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default class Authenticate extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { credentials, onLogin } = this.props;
    console.log('CREDENTIALS....', credentials);
    if (credentials.username != undefined && credentials.username.trim().length == 0) {
      credentials.username = 'app';
      credentials.password = 'apalya01';
      let e;
      onLogin(e, credentials);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    console.log('AUTH COMPONENT updated....', this.props);
    if (this.props.user != prevProps.user && this.props.isLoggedIn) {
      console.log('AUTH SUCCESS.....', this.props.user);
      localStorage.setItem('userinfo', JSON.stringify(this.props.user));
      // this.setState({currentDate:this.props.currentDate});
    }
  }

  render() {
    const self = this;

    const {
      loading,
      error,
      credentials,
      user,
      isLoggedIn,
    } = this.props;

    return (
      <article>
        <section>
          {!isLoggedIn && <span>Authenticating....</span>}
          <p>Authenticating...please wait! {isLoggedIn.toString()}</p>
        </section>

        {isLoggedIn && (
          <Redirect to="/dashboard" />
        )
        }
      </article>
    );
  }
}

Authenticate.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  credentials: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  onLogin: PropTypes.func
};
