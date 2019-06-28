/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import { AUTH_LOGIN } from 'config/APIEndPoints';
import ApiClient from 'utils/ApiClient';
//import Highcharts from 'highcharts'
//import addHighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';
/*import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';*/

import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, BarSeries, Tooltip, withHighcharts
  } from 'react-jsx-highcharts';

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
    localStorage.setItem(key, result);
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

    const plotOptions = {
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
            <h2>Start your next react project in seconds</h2>
            <h3>{isLoggedin.toString()}....</h3>
            {/*<h4>{Object.keys(userinfo).map(key => (
              <p key={key} details={userinfo[key]} >{userinfo[key]}</p>
            ))}</h4>*/}
          </section>
          <section>
            <HighchartsChart plotOptions={plotOptions}>
              <Chart type="column" inverted={false} />
              <Legend />

              <XAxis 
                id="x"
                categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']}
              />

              <YAxis id="number">
                <BarSeries id="jane" name="Jane" data={[3, 2, 1, 3, 4]} />
                <BarSeries id="john" name="John" data={[2, 3, 5, 7, 6]} />
                <BarSeries id="joe" name="Joe" data={[4, 3, 3, 9, 0]} />
              </YAxis>

              <Tooltip formatter={formatter} />
            </HighchartsChart>
          </section>
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
