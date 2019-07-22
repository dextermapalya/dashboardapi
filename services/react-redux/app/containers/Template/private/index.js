import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

export default class PrivateLayout extends Component {
    
    constructor(props) {
        console.log('PROPSSSS....', props)
        super(props);
        //this.userActions = new UserActions(this.props.dispatch);
        this.state = {
            active: false,
            // isLoggedIn: false,
          };        
          this.updateValue = this.updateValue.bind(this)
    }

    updateValue = (value) => {
        this.setState({
          active: value
        });
    };

    render() {
        const {Component, route, user, isLoggedIn} = this.props;
        const { active} = this.state

        /*const Component = this.props.component;
        const route = this.props.route;
        const user = this.props.user;
        const userActions = this.props.userActions;*/
        return (
            <div className="app-wrapper ">  
            <div
              id="wrapper_body"
              className={
                active ? 'mini-navbar pace-done' : 'side-navbar pace-done'
              }
            >            
            <Sidebar />
            <div id="page-wrapper" className="gray-bg">
            <Header updateParent={this.updateValue} />                
            <div className="wrapper wrapper-content wrapper_data animated fadeInRight">
    
                <Component route={route}/>
            </div>
            </div>
            </div>
            </div>
        );
    }
}