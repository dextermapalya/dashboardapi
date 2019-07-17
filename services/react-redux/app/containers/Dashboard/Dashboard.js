/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import "./style.scss";

import "react-datepicker/dist/react-datepicker.css";
import DateSelector from "containers/DateSelector/Loadable";
import InstallChart from "components/charts/installations";
import RegistrationChart from "components/charts/registrations";
import RenewalChart from "components/charts/renewals";
import SubscriptionChart from "components/charts/subscriptions";

class Dashboard extends Component {
  
  state = {
    showInstallChart: true,
    showRegistrationChart: true,
    showRenewalChart: true,
    showSubscriptionChart: true
  };

  render() {

    const { 
      showInstallChart, 
      showRegistrationChart, 
      showRenewalChart, 
      showSubscriptionChart 
          } = this.state;

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
                     {showInstallChart ? (
             <i className="fa fa-chevron-up uparrow" 
             onClick={() =>
               this.setState({
                showInstallChart: !this.state.showInstallChart
               })
             }
             />
              ) : <i className="fa fa-chevron-down downarrow" 
              onClick={() =>
                this.setState({
                  showInstallChart: !this.state.showInstallChart
                })
              }
              />}
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
              {showInstallChart ? (
              <div className="ibox-content">
                <InstallChart />
              </div>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="Individual_title">Registrations Hourly</h5>
                <div className="ibox-tools">
                <a className="collapse-link">  
                     {showRegistrationChart ? (
             <i className="fa fa-chevron-up uparrow" 
             onClick={() =>
               this.setState({
                showRegistrationChart: !this.state.showRegistrationChart
               })
             }
             />
              ) : <i className="fa fa-chevron-down downarrow" 
              onClick={() =>
                this.setState({
                  showRegistrationChart: !this.state.showRegistrationChart
                })
              }
              />}
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
              {showRegistrationChart ? (
              <div className="ibox-content">
                 <RegistrationChart />
              </div>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="Individual_title">Renewals Hourly</h5>
                <div className="ibox-tools">
                <a className="collapse-link">  
                     {showRenewalChart ? (
             <i className="fa fa-chevron-up uparrow" 
             onClick={() =>
               this.setState({
                showRenewalChart: !this.state.showRenewalChart
               })
             }
             />
              ) : <i className="fa fa-chevron-down downarrow" 
              onClick={() =>
                this.setState({
                  showRenewalChart: !this.state.showRenewalChart
                })
              }
              />}
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
              {showRenewalChart ? (
              <div className="ibox-content">
                <RenewalChart />
              </div>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5 className="Individual_title">Subscriptions Hourly</h5>
                <div className="ibox-tools">
                <a className="collapse-link">  
                     {showSubscriptionChart ? (
             <i className="fa fa-chevron-up uparrow" 
             onClick={() =>
               this.setState({
                showSubscriptionChart: !this.state.showSubscriptionChart
               })
             }
             />
              ) : <i className="fa fa-chevron-down downarrow" 
              onClick={() =>
                this.setState({
                  showSubscriptionChart: !this.state.showSubscriptionChart
                })
              }
              />}
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
              {showSubscriptionChart ? (
              <div className="ibox-content">
               <SubscriptionChart />
              </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
    )
  }
}

export default Dashboard;





