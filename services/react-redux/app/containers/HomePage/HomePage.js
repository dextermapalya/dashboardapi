/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { AUTH_LOGIN } from 'config/APIEndPoints';
import ApiClient from 'utils/ApiClient';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/* import {
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

    this.state = {
      userinfo: '', isLoggedin: false, name: 'Test', startDate: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    /* if (username && username.trim().length > 0) {
      onSubmitForm();
    } */
    this.fetchData();
  }


  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result));
    console.log('result', result);
    this.setState({
      userinfo: JSON.parse(JSON.stringify(result)),
      isLoggedin: true,
    });
  };


  fetchData() {
    const fd = new FormData();
    fd.set('username', 'app');
    fd.set('password', 'apalya01');
    fd.set('scope', 'read');

    ApiClient.post(AUTH_LOGIN, fd)
      .then((res) => res.data)
      .then((result) => this.onSetResult(result, 'userinfo'));
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }


  render() {
    const self = this;
    const formatter = () => {
      console.log(this);
      // logs an object with properties: points, x, y
    };

    const {
      loading,
      error,
      repos,
      username,
      onChangeUsername,
      onSubmitForm,
    } = this.props;
    const {
      isLoggedin, userinfo, name, startDate, handleChange
    } = this.state;

    const reposListProps = {
      loading,
      error,
      repos,
    };


    const plotOptions = {
      column: {
        stacking: 'normal'
      },
      series: {
        stacking: 'normal'
      },
      bar: {
        // shared options for all bar series
      }
    };

    return (
      <article>

        <div className="home-page">
          <section className="centered">
            { /* conditional expressions */}
            {!isLoggedin && (
              <span>Authenticating....</span>
            )}

            <h3>
              {isLoggedin.toString()}
....
            </h3>
            {/* <h4>{Object.keys(userinfo).map(key => (
              <p key={key} details={userinfo[key]} >{userinfo[key]}</p>
            ))}</h4> */}
          </section>

          {isLoggedin && (
            <section>
              <div className="dashbord_header">
                <h2 className="navbar-left">Business Dashboard</h2>

                <div className="nav navbar-top-links navbar-right ">
                  <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    placeholderText="Select Date"
                  />
                </div>
              </div>
              <div className="row content_area">
                <div className="col-lg-6">
                  <div className="ibox float-e-margins">
                    <div className="ibox-title">
                      {/* <h4 className="Individual_title">Dashboard</h4> */}
                      <div className="ibox-tools">
                        <a className="collapse-link">
                          <i className="fa fa-chevron-up uparrow" />
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                          <li>
                            <a href="#">Config option 1</a>
                          </li>
                          <li>
                            <a href="#">Config option 2</a>
                          </li>
                        </ul>

                      </div>
                    </div>
                    <div className="ibox-content">
                      {/* <InstallationChart isLoggedin={isLoggedin} chartname="installation" /> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ibox float-e-margins">
                    <div className="ibox-title">
                      {/* <h4 className="Individual_title">Dashboard</h4> */}
                      <div className="ibox-tools">
                        <a className="collapse-link">
                          <i className="fa fa-chevron-up uparrow" />
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                          <li>
                            <a href="#">Config option 1</a>
                          </li>
                          <li>
                            <a href="#">Config option 2</a>
                          </li>
                        </ul>

                      </div>
                    </div>
                    <div className="ibox-content">
                      {/* <RegistrationChart isLoggedin={isLoggedin} chartname="registrations" /> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ibox float-e-margins">
                    <div className="ibox-title">
                      {/* <h4 className="Individual_title">Dashboard</h4> */}
                      <div className="ibox-tools">
                        <a className="collapse-link">
                          <i className="fa fa-chevron-up uparrow" />
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                          <li>
                            <a href="#">Config option 1</a>
                          </li>
                          <li>
                            <a href="#">Config option 2</a>
                          </li>
                        </ul>

                      </div>
                    </div>
                    <div className="ibox-content">
                      {/* <RenewalChart isLoggedin={isLoggedin} chartname="renewals" /> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ibox float-e-margins">
                    <div className="ibox-title">
                      {/* <h4 className="Individual_title">Dashboard</h4> */}
                      <div className="ibox-tools">
                        <a className="collapse-link">
                          <i className="fa fa-chevron-up uparrow" />
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                          <li>
                            <a href="#">Config option 1</a>
                          </li>
                          <li>
                            <a href="#">Config option 2</a>
                          </li>
                        </ul>

                      </div>
                    </div>
                    <div className="ibox-content">
                      {/* <SubscriptionChart isLoggedin={isLoggedin} chartname="subscriptions" /> */}
                    </div>
                  </div>
                </div>

              </div>


            </section>
          )}

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
