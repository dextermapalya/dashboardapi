import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import history from 'utils/history';

import './Login.scss'

class Login extends Component {

  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);

  }

  validateForm(e) {
    const self = this;
    e.preventDefault();
    const { onLogin, credentials  } = this.props;
    /*credentials.username = 'app';
    credentials.password = 'apalya01';*/
    console.log('dispatching credentials++++')
    onLogin(e, credentials);
  }



  componentDidUpdate(prevProps, prevState) {
    const { user, isLoggedIn } = this.props;

    if (user !== prevProps.user && isLoggedIn) {
      console.log('AUTH SUCCESS.....', user);
      localStorage.setItem('userinfo', JSON.stringify(user));
      //history.push('/dashboard')
    }
  }

  render() {

    const self = this;

    const {
      loading,
      error,
      isLoggedIn,
      location,
      credentials,
      onChangeUsername,
      onChangePassword
    } = this.props;


        /* IF USER WAS REDIRECTED BECAUSE OF ROUTE PROTECTION
    * then extract the key for previous route so that user
    * can be redirected to that page
    */
   console.log('AUTH++++', location, isLoggedIn)
   var prevRoute;
   //if (location && location.state )
   //  prevRoute = location.state.prevLocation;
   /* when the app grows, there will be several routes in such
   * scenarios use the value of prevRoute until then redirect
   * user to dashboard */
   prevRoute = '/dashboard';
   console.log('AUTH++++___', isLoggedIn)

    return (
      <Fragment>
      {isLoggedIn && 
        <Redirect to={prevRoute} />
      }
    
    {!isLoggedIn && (  
    <div className="app-wrapper wrapper_login">  
    <div id="wrapper_body" className="mini-navbar pace-done">
    <div className="wrapper_sigin">
    
      <Container>
          <div className="login_area">
          <Col>
        <h2 className="text-center">Sign In</h2>
        </Col>
        <Form className="form" onSubmit={this.validateForm}>
          <Col>
            <FormGroup>
              <Label for="Username">Email</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Email/Username"
                onChange={onChangeUsername}
                value={credentials.username}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={onChangePassword}
                value={credentials.password}
              />
            </FormGroup>
          </Col>
          <Col  className="text-center">
          <Button type="submit">Login</Button>
          </Col>
        </Form>
        </div>
      </Container>
    
      </div>
      </div>
    </div>  
    )
    } 
    </Fragment>
    );
  }
}


Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  credentials: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  onLogin: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func,
  location: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Login;