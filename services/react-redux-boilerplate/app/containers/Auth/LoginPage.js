/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import ApiClient from '../../utils/ApiClient'

//import { Button, FormGroup, Form, Label } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  constructor(props) {
    super(props);

    this.state = { chartname:'', username:'', password:'', scope:'read' };
  }

  validateForm() {
    return this.state.username.length >= 3 && this.state.password.length >= 3;
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  /* auto login and get the Bearer token */
  autoLogin() {

    const { user_info } = this.state;

    //const userInfo = localStorage.getItem('user_info');

    var fd = new FormData();
    fd.set('username', 'app');
    fd.set('password', 'apalya01');
    fd.set('scope', 'read');
    
    ApiClient.post( 'auth/login/', fd  )
    .then(res => {
      console.log('result ....', res.data)
      return res
    })
    .then(result => this.onSetResult(result, 'user_info') )
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  onSetResult = (result, key) => {
    console.log(result, key)
    localStorage.setItem( key, JSON.stringify(result.data) );
    this.setState({chartname:'registrations', user_info: result.data})
    console.log('chartype', this.state.chartname) 
    console.log('token login', result.data.token )
  };

  render() {
    console.log('Rendering login page....')
    const {
      loading, error, userinfo, username, password, onChangeUsername, onChangePassword, onSubmitForm
    } = this.state;
    const reposListProps = {
      loading,
      error,
      userinfo
    };


    /*if (this.state.charttype != '') {
      Graph = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }*/


    return (
      <Fragment>
      <Helmet>
      <title>Login</title>
      <meta name="description" content="Centralised Dashboard Authentication" />
      </Helmet>
      <div className="Login">
        <Form onSubmit={onSubmitForm}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Username/Email</ControlLabel>
            <Input
              autoFocus
              type="text"
              value={username}
              onChange={onChangeUsername}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <Input
              value={password}
              onChange={onChangePassword}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
      </Fragment>
    );
    
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func
};
