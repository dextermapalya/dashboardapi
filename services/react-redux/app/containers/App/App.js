/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Signup from 'components/register/Signup'
import Footer from 'components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
//import Home from '../HomePage/Home';
import Sample from 'containers/HomePage/Sample'
const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    {/* <Header />
    <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Dashboard</h1>
                    </div>
                </div>
    </div> */}
    <Switch>
      <Route exact path="/" component={Sample} />
      <Route exact path="/signup" component={Signup} />

      <Route path="/features" component={FeaturePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    {/* <Footer /> */}
  </div>
);

export default App;
//export default withHighcharts(App, Highcharts);
