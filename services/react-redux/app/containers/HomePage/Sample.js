import React , {Component} from 'react';
import '../../styles/style_th.scss';
import '../../styles/custom.scss';
import logo from '../../assets/images/logo.png';
import dashicon from '../../assets/images/dashboard.png';
import settingsicon from '../../assets/images/settings_icon.png';
import HomePage from 'containers/HomePage/Loadable';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CurrentDate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startDate: ""
      };
      this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }
   
    render() {
      return (
        <DatePicker
        placeholderText="Select a Date"
        selected={this.state.startDate}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
       
        />
        // <DatePicker
        // selected={this.state.startDate}
        // onChange={this.handleChange}
        // highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
        // placeholderText="This highlights a week ago and a week from today" />          
      );
    }
  }

const Sample = () => {
   

    return (
        <section>
                <body className="mini-navbar">
    <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse side_menu">
            <ul className="nav metismenu" id="side-menu">
                <li>
                    <a href="#" className="list_active"><img src={dashicon}/><span className="nav-label list_active">Dashboard</span> </a>
                </li>
            </ul>
        </div>
    </nav>

    <div id="page-wrapper" className="gray-bg">
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top" >

                    <span>
                        <img src={logo} className="header_logo" /> 
                    </span>
                    <ul className="nav navbar-top-links navbar-right login_dropdown">
                        <div className="navbar">
                            <div className="navbar-inner">
                                <div className="container-fluid">
                                    <div className="nav-collapse ">
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="dropdown">
                                                <a href="#" className=" btn-grad" data-toggle="dropdown" role="button" aria-expanded="false">Username_login_Id<span className="caret"></span></a>
                                              
                                                {/* <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#"><i className="fa fa-unlock-alt" aria-hidden="true"></i> Login</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="#"><span className="fa fa-power-off"></span> Log Out</a></li>
                                                </ul> */}
                                            </li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right settings_dropdown">
                                            <li className="dropdown">
                                                <a href="#" className=" btn-grad" data-toggle="dropdown" role="button" aria-expanded="false"><img src={settingsicon} /></a>
                                                {/* <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#"><i className="fa fa-unlock-alt" aria-hidden="true"></i> Login</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="#"><span className="fa fa-power-off"></span> Log Out</a></li>
                                                </ul> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </nav>
        </div>

        <div className="wrapper wrapper-content wrapper_data animated fadeInRight">
            <div className="dashbord_header">
                <h2 className="navbar-left">Business Dashboard</h2>

                <ul className="nav navbar-top-links navbar-right ">
                        <div className="navbar">
                            <div className="navbar-inner">
                                <div className="container-fluid">
                                    <div className="nav-collapse ">
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="dropdown">
                                                 {/* <DateRangePicker startDate="1/1/2014" endDate="3/1/2014">
                                                      <button className="dropdown-toggle btn-grad daterange_btn" data-toggle="dropdown" role="button" aria-expanded="false">Select Dates<span className="caret"></span></button>
                                                </DateRangePicker>  */}
                                                <CurrentDate />
                                                
                                                {/* <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#">1</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="#">2</a></li>
                                                </ul> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>

            <div className="row content_area">
                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            {/* <h4 className="Individual_title">Dashboard</h4> */}
                            <div className="ibox-tools">
                                <a className="collapse-link">
                                    <i className="fa fa-chevron-up uparrow"></i>
                                </a>

                                <ul className="dropdown-menu dropdown-user">
                                    <li><a href="#">Config option 1</a>
                                    </li>
                                    <li><a href="#">Config option 2</a>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="ibox-content">
                           <HomePage />
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    </div>

    

</body>
        </section>
    )

}

export default Sample;