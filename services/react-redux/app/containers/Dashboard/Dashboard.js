/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { map, remove, includes } from 'lodash';
import Log from 'logger-init';
import Chart from 'components/Chart';
import './style.scss';
import { ROLES } from 'shared/constants';
import _ from 'lodash';

import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from 'containers/DateSelector/Loadable';
import InstallChart from 'components/charts/installations';
import RegistrationChart from 'components/charts/registrations';
import RenewalChart from 'components/charts/renewals';
import SubscriptionChart from 'components/charts/subscriptions';
import ApperrorsChart from 'components/charts/apperrors';


class Dashboard extends Component {


  state = {
    showInstallChart: true,
    showRegistrationChart: true,
    showRenewalChart: true,
    showSubscriptionChart: true,
    installChart: true,
    registrationChart: true,
    renewalChart: true,
    subscriptionChart: true,
    apperrorsChart: true,
  };

  constructor(props) {
    super(props);
    /* user object is passed via the redirect component
    it is redirected from the Home component
    */
    this.toggle = this.toggle.bind(this);
  }

  toggle = (e) => {
    e.preventDefault();
    const {
      installChart, registrationChart,
      renewalChart, subscriptionChart,
      apperrorsChart
    } = this.state;

    switch (e.target.id) {
      case 'installChart':
        this.setState({ installChart: !installChart });
        break;
      case 'registrationChart':
        this.setState({ registrationChart: !registrationChart });
        break;
      case 'renewalChart':
        this.setState({ renewalChart: !renewalChart });
        break;
      case 'subscriptionChart':
        this.setState({ subscriptionChart: !subscriptionChart });
        break;
      case 'apperrorsChart':
        this.setState({ apperrorsChart: !apperrorsChart });
        break;
      default:
    }
  }

  /* getUserCharts 
  *  return an array of chart titles that the user can view
  *  this is based on user roles
  */
  getUserCharts = () => {
    /* user object is nested within the props route 
    * and passed in via redirect from the Home component
    */
    const { user, isLoggedIn } = this.props;
    /* if user object cannot be retrieved then user cannot view any chart*/
    if (!user) {
      return [];      
    }

    /* extract all the charts defined in ROLES in shared/consants */
    // const charts = map(ROLES, 'graph_type'); // [subscriptions, registrations, renewals,etc]
    const charts = [];
    map(ROLES, (item, idx) => {
      /* iterate through each role assigned to logged in user */
      /* for a given chart user should possess atleast one of the roles assigned to a chart 
        * scenario 1 if chart subscriptions can be viewed by roles tech, management, business
        * and user is assigned to role tech then the chart can be viewed
        * scenario 2 if chart subscriptions can be viewed by roles tech, management 
        * and user is assigned to role business then user cannot view the chart user does not possess
        * desired role
        */
      for (let i = 0; i < user.roles.length; i++) {
        if (item.roles.indexOf(user.roles[i]) >= 0) {
          charts.push(item);
          break;
        }
      }
    });
    Log.info('!!!!!!!', charts);
    return charts;
  }

  render() {
    const upArrow = 'fa-chevron-up uparrow';
    const downArrow = 'fa-chevron-down downarrow';
    Log.info('!!!!!', this.props);
    /* get list of charts user can view */
    const { user, isLoggedIn } = this.props;
    // const isLoggedIn = (route.location.state.isLoggedIn) ? route.location.state.isLoggedIn : null;
    const charts = this.getUserCharts();
    /* ChartList allows to convert string to Component */
    const ChartList = {
    	InstallChart: InstallChart,
      RegistrationChart: RegistrationChart,
      RenewalChart: RenewalChart,
      SubscriptionChart: SubscriptionChart,
      ApperrorsChart: ApperrorsChart
    };

    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <article>
        <div className="home-page">
          <section>
            <div className="dashbord_header">
              <h2 className="navbar-left">Business Dashboard</h2>

              <div className="nav navbar-top-links navbar-right ">
                <DateSelector />
              </div>
            </div>

            <div className="row content_area">
              {charts.map((data, index) => {
                Log.info('*********', data);
                const Control = ChartList[data.graph_type];
                return (
                  <Chart data={data.props} key={data.graph_type} component={ChartList[data.graph_type]} />
                );
              })}

            </div>
          </section>
        </div>
      </article>
    );
  }
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};
export default Dashboard;
