import React , {Component} from 'react';

export default class PublicLayout extends  React.PureComponent {

    constructor(props) {
        console.log('PROPSSSS....', props)
        super(props);
        //this.userActions = new UserActions(this.props.dispatch);
      }

    render() {
        const {Component, route, user, isLoggedIn} = this.props;
        //const route = this.props.route;
        //const user  = this.props.user;
        return (
            // <div className="app-wrapper wrapper_login">
                <Component route={route}/>
            // </div>
        );
    }
}