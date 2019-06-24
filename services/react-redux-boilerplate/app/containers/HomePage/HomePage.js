/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import RegistrationChart from 'components/highchart/RegistrationChart';

const options = Highcharts.Options = {
  title: {
      text: 'My chart'
  },
  series: [{
      type: 'line',
      data: [[1,5], [2, 3],[3,0], [4,8], [5,0], [6,3],[7,2],[8,4],[9,3],[10,3],[11,3],[12,0],[13,4]]
  }]
}

const HCR = () =>  {
 return (
 <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
 </div>
 )
}


const afterRender = (chart) => { 
    console.log('after Render')
    /* do stuff with the chart  */ 
};


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
     
  }

 
  render() {
    const {
      loading, error, repos, username, onChangeUsername, onSubmitForm
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <RegistrationChart charttype="registration" />
          <section className="centered">
            <h2>Start your next react project in seconds</h2>
            <p>
              A minimal <i>React-Redux</i> boilerplate with all the best practices
            </p>
          </section>
          <section>
            <div className="timeseries"></div>
            <HCR />
          </section>
          <section>
            <h2>Git Repos</h2>
            <form onSubmit={onSubmitForm}>
              <label htmlFor="username">
                Show Github repositories by
                <span className="at-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  placeholder="flexdinesh"
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </form>
            <ReposList {...reposListProps} />
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
  onChangeUsername: PropTypes.func
};
