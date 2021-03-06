import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.scss';

class Sidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { addClass: false };
    this.toggleremove = this.toggleremove.bind(this);
  }

  toggle() {
    const { addClass } = this.state;
    this.setState({ addClass: !addClass });
  }

  toggleremove(e) {
    e.preventDefault();
    this.setState({ addClass: false });
  }


  render() {
    const { addClass } = this.state;

    const subMenuClass = ['nav nav-second-level collapse'];
    if (addClass) {
      subMenuClass.push('in');
    }
    if (addClass) {
      subMenuClass.push('');
    }
    const DropDownClass = ['router-link list_active'];
    if (addClass) {
      DropDownClass.push('dropdown_arrow');
    }
    if (addClass) {
      DropDownClass.push('');
    }

    // const homeItem = location.pathname === "/" ? "router-link list_active active" : "router-link list_active";


    return (

      <div className="header">

        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse side_menu">
            <ul className="nav metismenu" id="side-menu">

              <li className="Nav_item">
                <NavLink to="/" className="router-link list_active" activeClassName="active" onClick={this.toggleremove}>
                  <i className="fa fa-windows" aria-hidden="true"></i><span className="nav-label list_active">Dashboard</span>
                </NavLink>
              </li>
              {/* <li className="Nav_item">
                  <NavLink className={DropDownClass.join(' ')} to="/features" activeClassName="active" onClick={this.toggle.bind(this)}>
                    <i className="fa fa-cog" aria-hidden="true"></i><span className="nav-label">Settings</span><span className="fa arrow"></span>
                  </NavLink>
                   <ul className={subMenuClass.join(' ')}>
                            <li><a href="#">Individual Personalization</a></li>
                            <li><a href="#">Mass Personalization</a></li>
                            <li><a href="#">Similar Contents</a></li>
                            <li><a href="#">Because You Watched</a></li>
                    </ul>
                  </li>
                  <li className="Nav_item">
                  <NavLink to="/" className="router-link list_active" to="/NotFoundPage" activeClassName="active" onClick={this.toggleremove.bind(this)}>
                  <i className="fa fa-windows" aria-hidden="true"></i><span className="nav-label list_active">about</span>
                  </NavLink>
                  </li>    */}
            </ul>
          </div>
        </nav>
      </div>

    );
  }
}

export default Sidebar;
