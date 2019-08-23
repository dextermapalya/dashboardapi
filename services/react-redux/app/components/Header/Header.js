import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import Log from 'logger-init';
import './style.scss';
import settingsicon from 'assets/images/settings_icon.png';
import logo from 'assets/images/logo.png';
// import Banner from './images/banner.jpg';
import PropTypes from 'prop-types';
import history from 'utils/history';


export default class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownOpen2: false,
      active: true,
      // defaultValue: 1
    };
  }

  togglebutton = (e) => {
    e.preventDefault();
    const { active } = this.state;
    const { updateParent } = this.props;

    updateParent(active);
    this.setState({ active: !active });
    // if (this.state.active) {
    //   this.setState({ defaultValue: 1 });
    // } else {
    //   this.setState({ defaultValue: -1 });
    // }
  };

  toggle2() {
    this.setState((prevState) => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  logout() {
    console.log('clearning localstorage...!!!', this.props);
    let e;
    // localStorage.clear();
    const { onLogout, history } = this.props;
    // set isLoggedIn as false
    onLogout(e, false);
    console.log('clearning localstorage...!!!');
    // history.push('/');
    window.location.reload();

  }


  render() {
    const {
      toggle, dropdownOpen, dropdownOpen2, toggle2, togglebutton, logout
    } = this.state;
    const { user, isLoggedIn } = this.props;
    const strUser = (user.user.first_name === '') ? user.user.username : user.user.first_name + ' ' + user.user.last_name
    if (!isLoggedIn) {
      Log.info('NOT LOGGED IN!!!!');
      return (<Redirect to="/" />);
    }

    return (

      <div className="header">
        <div className="row border-bottom">
          <nav className="navbar navbar-static-top">

            <span>
              <img alt={''} src={logo} className="header_logo" />
              <button type="button" className="minimalize-styl-2 btn btn-primary navbar_toggle" onClick={this.togglebutton}>
                <i className="fa fa-bars" />
                {' '}
              </button>
            </span>

            <ul className="nav navbar-top-links navbar-right login_dropdown">
              <div className="navbar">
                <div className="navbar-inner">
                  <div className="container-fluid">
                    <div className="nav-collapse ">
                      <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                          <Dropdown className="login_dropdown" isOpen={dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret className="btn-grad">
                                                  Welcome {strUser}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.logout}>
                                Logout
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right settings_dropdown">
                        <li className="dropdown">
                          <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                            <DropdownToggle className="btn-grad">
                              <img alt={''} src={settingsicon} />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>auto</DropdownItem>
                              <DropdownItem>20</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </nav>
        </div>


      </div>

    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  updateParent: PropTypes.func,
  onLogout: PropTypes.func,
};

// export default connect(null, mapDispatchToProps)(Header);
// export default Header;
