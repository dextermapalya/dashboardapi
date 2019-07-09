import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';
import settingsicon from '../../assets/images/settings_icon.png';
import logo from '../../assets/images/logo.png';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownOpen2: false,
      active: true,
      // defaultValue: 1
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle2() {
    this.setState((prevState) => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }

  togglebutton = () => {
    this.props.updateParent(this.state.active);
    this.setState({ active: !this.state.active });
    // if (this.state.active) {
    //   this.setState({ defaultValue: 1 });
    // } else {
    //   this.setState({ defaultValue: -1 });
    // }
  };

  render() {
    return (

      <div className="header">
        <div className="row border-bottom">
          <nav className="navbar navbar-static-top">

            <span>
              <img src={logo} className="header_logo" />
              <button className="minimalize-styl-2 btn btn-primary navbar_toggle" onClick={this.togglebutton}><i className="fa fa-bars"></i> </button>
            </span>

            <ul className="nav navbar-top-links navbar-right login_dropdown">
              <div className="navbar">
                <div className="navbar-inner">
                  <div className="container-fluid">
                    <div className="nav-collapse ">
                      <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                          <Dropdown className="login_dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret className="btn-grad">
                                                  Username_Dashboard
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>Login</DropdownItem>
                              <DropdownItem>LogOut</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right settings_dropdown">
                        <li className="dropdown">
                          <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                            <DropdownToggle className="btn-grad">
                              <img src={settingsicon} />
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

export default Header;
