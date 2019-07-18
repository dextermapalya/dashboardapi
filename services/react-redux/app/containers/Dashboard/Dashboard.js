/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import {
  Collapse, Button, CardBody, Card
} from 'reactstrap';

import './style.scss';

import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from 'containers/DateSelector/Loadable';
import InstallChart from 'components/charts/installations';
import RegistrationChart from 'components/charts/registrations';
import RenewalChart from 'components/charts/renewals';
import SubscriptionChart from 'components/charts/subscriptions';

class Dashboard extends Component {
  state = {
    showInstallChart: true,
    showRegistrationChart: true,
    showRenewalChart: true,
    showSubscriptionChart: true,
    installChart: true,
    registrationChart: true,
    renewalChart: true,
    subscriptionChart: true
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle = (e) => {
    e.preventDefault();
    const {
      installChart, registrationChart,
      renewalChart, subscriptionChart
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
      default:
    }
  }

  render() {
    const upArrow = 'fa-chevron-up uparrow';
    const downArrow = 'fa-chevron-down downarrow';

    const {
      showInstallChart,
      showRegistrationChart,
      showRenewalChart,
      showSubscriptionChart,
      installChart,
      registrationChart,
      renewalChart,
      subscriptionChart
    } = this.state;

    const installArrow = installChart ? upArrow : downArrow;
    const registrationArrow = registrationChart ? upArrow : downArrow;
    const renewalArrow = renewalChart ? upArrow : downArrow;
    const subscriptionArrow = subscriptionChart ? upArrow : downArrow;

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
              <div className="col-lg-6">
                <div className="ibox float-e-margins">
                  <div className="ibox-title">
                    <h5 className="Individual_title">Installations Hourly</h5>
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
                      <InstallChart />
                    </div>

                  </Collapse>
                </div>
              </div>


              <div className="col-lg-6">
                <div className="ibox float-e-margins">
                  <div className="ibox-title">
                    <h5 className="Individual_title">Registrations Hourly</h5>
                    <div className="ibox-tools">
                      <a className="collapse-link">
                        <Button id="registrationChart" className={`fa ${registrationArrow}`} onClick={this.toggle} />
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
                  <Collapse isOpen={registrationChart}>
                    <div className="ibox-content">
                      <RegistrationChart />
                    </div>
                  </Collapse>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ibox float-e-margins">
                  <div className="ibox-title">
                    <h5 className="Individual_title">Renewals Hourly</h5>
                    <div className="ibox-tools">
                      <a className="collapse-link">
                        <Button id="renewalChart" className={`fa ${renewalArrow}`} onClick={this.toggle} />
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
                  <Collapse isOpen={renewalChart}>
                    <div className="ibox-content">
                      <RenewalChart />
                    </div>
                  </Collapse>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ibox float-e-margins">
                  <div className="ibox-title">
                    <h5 className="Individual_title">Subscriptions Hourly</h5>
                    <div className="ibox-tools">
                      <a className="collapse-link">
                        <Button id="subscriptionChart" className={`fa ${subscriptionArrow}`} onClick={this.toggle} />
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
                  <Collapse isOpen={subscriptionChart}>
                    <div className="ibox-content">
                      <SubscriptionChart />
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    );
  }
}

export default Dashboard;
