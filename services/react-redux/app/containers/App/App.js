/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import {  Switch, Route } from 'react-router-dom';

import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Authenticate from 'containers/auth';
import ProtectedRoute from "components/auth";

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Home from "components/home";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/style_th.scss';
import '../../styles/custom.scss';
import '../../styles/animate.scss';
import Dashboard from 'containers/Dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      isLoggedIn:false,
    };
  }

      updateValue = (value) => {
        this.setState({
          active: value
        });
      };

      render() {
        return (

          <div className="app-wrapper">
            <div
              id="wrapper_body"
              className={
                this.state.active ? 'mini-navbar pace-done' : 'side-navbar pace-done'
              }
            >
              <Sidebar />
              <div id="page-wrapper" className="gray-bg">
                <Header updateParent={this.updateValue} />
                <div className="wrapper wrapper-content wrapper_data animated fadeInRight">
                  <Switch>
                    <Route exact path="/" component={Authenticate} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/features" component={FeaturePage} />
                    <Route path="/NotFoundPage" component={NotFoundPage} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        );
      }
}


export default App;
