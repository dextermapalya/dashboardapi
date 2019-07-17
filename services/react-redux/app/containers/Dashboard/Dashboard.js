/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import './style.scss';

import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from 'containers/DateSelector/Loadable';
import InstallChart from 'components/charts/installations';
import RegistrationChart from 'components/charts/registrations';
import RenewalChart from 'components/charts/renewals';
import SubscriptionChart from 'components/charts/subscriptions';


const Dashboard = () => (
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
                <InstallChart />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="Individual_title">Registrations Hourly</h5>
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
                <RegistrationChart />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="Individual_title">Renewals Hourly</h5>
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
                <RenewalChart />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="Individual_title">Subscriptions Hourly</h5>
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
                <SubscriptionChart />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
);

export default Dashboard;
