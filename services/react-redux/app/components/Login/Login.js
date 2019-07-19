import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

import './Login.scss'

class Login extends Component {
  render() {
    return (
    <div className="wrapper_sigin">
      <Container>
          <div className="login_area">
          <Col>
        <h2 className="text-center">Sign In</h2>
        </Col>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Enter Email"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Enter Password"
              />
            </FormGroup>
          </Col>
          <Col  className="text-center">
          <Button>Submit</Button>
          </Col>
        </Form>
        </div>
      </Container>
      </div>
    );
  }
}

export default Login;