/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import { AUTH_LOGIN } from 'config/APIEndPoints';
import ApiClient from 'utils/ApiClient';
import Highcharts from 'highcharts';
import InstallationChart from 'components/highchart/InstallationChart'
import RegistrationChart from 'components/highchart/RegistrationChart'
import RenewalChart from 'components/highchart/RenewalChart'
import SubscriptionChart from 'components/highchart/SubscriptionChart'

/*import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, BarSeries, Tooltip, withHighcharts
  } from 'react-jsx-highcharts';
*/


export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);

    this.state = { userinfo: '', isLoggedin: false, name: 'Test' };
  }

  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    /*if (username && username.trim().length > 0) {
      onSubmitForm();
    }*/
    this.fetchData();
  }

  fetchData() {
    var fd = new FormData();
    fd.set('username', 'app');
    fd.set('password', 'apalya01');
    fd.set('scope', 'read');

    ApiClient.post(AUTH_LOGIN, fd)
      .then(res => {
        return res.data;
      })
      .then(result => this.onSetResult(result, 'userinfo'));
  }

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result));
    console.log('result', result);
    this.setState({
      userinfo: JSON.parse(JSON.stringify(result)),
      isLoggedin: true,
    });
  };

  convertObject() {
    if (this.state.userinfo) {
      return Object.keys(this.state.userinfo).map(key => {
        return (
          <p>
            {key} => {this.state.userinfo[key]}
          </p>
        );
      });
    } else {
      return <p>data is not available</p>;
    }
  }



  render() {


    const self = this;
    const formatter = function () {
          console.log(this)
          // logs an object with properties: points, x, y
     }

    const {
      loading,
      error,
      repos,
      username,
      onChangeUsername,
      onSubmitForm,
    } = this.props;
    const { isLoggedin, userinfo, name } = this.state;

    const reposListProps = {
      loading,
      error,
      repos,
    };

    const plotOptionsa = {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
      }
    };

    const plotOptions = {
      column: {
        stacking:'normal'
      },
      series: {
          stacking: 'normal'
      },
      bar: {
        // shared options for all bar series
      }
    }

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h3>{isLoggedin.toString()}....</h3>
            {/*<h4>{Object.keys(userinfo).map(key => (
              <p key={key} details={userinfo[key]} >{userinfo[key]}</p>
            ))}</h4>*/}
          </section>
          <InstallationChart isLoggedin={isLoggedin} chartname="installation" />
          <RegistrationChart isLoggedin={isLoggedin} chartname="registrations" />
          <RenewalChart isLoggedin={isLoggedin} chartname="renewals" />
          <SubscriptionChart isLoggedin={isLoggedin} chartname="subscriptions" />

          
        </div>
  
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
