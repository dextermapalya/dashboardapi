/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import {
  Collapse, Button, CardBody, Card
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { map, remove, includes } from 'lodash';
import Log from 'logger-init';
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
    const { route } = this.props;
    const user = (route.location.state.user) ? route.location.state.user : null;
    /* if user object cannot be retrieved then user cannot view any chart*/
    if (!user) {
      return [];      
    }

    /* extract all the charts defined in ROLES in shared/consants */
    // const charts = map(ROLES, 'graph_type'); // [subscriptions, registrations, renewals,etc]
    const charts = [...ROLES];
    map(ROLES, (item) => {
      /* remove charts for which the user does not have permission */
      remove(charts, (ch) => {
        let mustRemove = true;
        Log.info('***', item.roles, user.roles, charts);
        /* iterate through each role assigned to logged in user */
        /* for a given chart user should possess atleast one of the roles assigned to a chart 
        * scenario 1 if chart subscriptions can be viewed by roles tech, management, business
        * and user is assigned to role tech then the chart can be viewed
        * scenario 2 if chart subscriptions can be viewed by roles tech, management 
        * and user is assigned to role business then user cannot view the chart user does not possess
        * desired role
        */

        for (let i = 0; i < user.roles.length; i++) {
          // check if role exists for the given chart
          if (includes(item.roles, user.roles[i])) {
            mustRemove = false;
            // if one of the role matches no need to check the rest
            break;
          }
        }
        return mustRemove;
      });
    });
    Log.info('!!!!!!!', charts);
    return charts;
  }

  render() {
    const upArrow = 'fa-chevron-up uparrow';
    const downArrow = 'fa-chevron-down downarrow';
    /* get list of charts user can view */
    const { route } = this.props;
    const isLoggedIn = (route.location.state.isLoggedIn) ? route.location.state.isLoggedIn : null;
    const charts = this.getUserCharts();
    Log.info('*****', charts);
    /* ChartList allows to convert string to Component */
    const ChartList = {
    	InstallChart: InstallChart,
      RegistrationChart: RegistrationChart,
      RenewalChart: RenewalChart,
      SubscriptionChart: SubscriptionChart,
      ApperrorsChart: ApperrorsChart
    };

    const {
      showInstallChart,
      showRegistrationChart,
      showRenewalChart,
      showSubscriptionChart,
      installChart,
      registrationChart,
      renewalChart,
      subscriptionChart,
      apperrorsChart,
    } = this.state;

    const installArrow = installChart ? upArrow : downArrow;
    const registrationArrow = registrationChart ? upArrow : downArrow;
    const renewalArrow = renewalChart ? upArrow : downArrow;
    const subscriptionArrow = subscriptionChart ? upArrow : downArrow;
    const apperrorsArrow = apperrorsChart ? upArrow : downArrow;
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
                  <div className="col-lg-6" key={index}>
                  <div className="ibox float-e-margins">
                    <div className="ibox-title">
                      <h5 className="Individual_title">{data.props.title} Hourly</h5>
                      <div className="ibox-tools">
                        <a className="collapse-link">
                          <Button id="installChart" className={`fa ${installArrow}`} onClick={this.toggle} />
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
                    <Collapse isOpen={installChart}>
  
                      <div className="ibox-content">
                        <Control />
                      </div>
  
                    </Collapse>
                  </div>
                </div>
                  )
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
