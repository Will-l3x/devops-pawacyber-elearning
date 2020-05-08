import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar/avatar-7.png";
import userbg from "../../assets/images/gallary/3.png";
import SideBar from "../../components/SideBar";
//import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
export class HomeScreen extends Component {
  render() {
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
            <SideBar></SideBar>
            <Link
                to=""
                data-activates="slide-out"
                className="sidebar-collapse waves-effect waves-block waves-light hide-on-large-only"
            >
                <i className="material-icons">format_indent_increase</i>
            </Link>
        </aside>

        <section id="content">
          <div className="container">
            <div id="card-stats">
              <div className="row mt-1">
                <div className="col s12 m6 l3">
                  <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text">
                    <div className="padding-4">
                      <div className="col s7 m7">
                        <i className="material-icons background-round mt-5">
                          add_shopping_cart
                        </i>
                        <p>Orders</p>
                      </div>
                      <div className="col s5 m5 right-align">
                        <h5 className="mb-0">690</h5>
                        <p className="no-margin">New</p>
                        <p>6,00,00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l3">
                  <div className="card gradient-45deg-red-pink gradient-shadow min-height-100 white-text">
                    <div className="padding-4">
                      <div className="col s7 m7">
                        <i className="material-icons background-round mt-5">
                          perm_identity
                        </i>
                        <p>Clients</p>
                      </div>
                      <div className="col s5 m5 right-align">
                        <h5 className="mb-0">1885</h5>
                        <p className="no-margin">New</p>
                        <p>1,12,900</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l3">
                  <div className="card gradient-45deg-amber-amber gradient-shadow min-height-100 white-text">
                    <div className="padding-4">
                      <div className="col s7 m7">
                        <i className="material-icons background-round mt-5">
                          timeline
                        </i>
                        <p>Sales</p>
                      </div>
                      <div className="col s5 m5 right-align">
                        <h5 className="mb-0">80%</h5>
                        <p className="no-margin">Growth</p>
                        <p>3,42,230</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l3">
                  <div className="card gradient-45deg-green-teal gradient-shadow min-height-100 white-text">
                    <div className="padding-4">
                      <div className="col s7 m7">
                        <i className="material-icons background-round mt-5">
                          attach_money
                        </i>
                        <p>Profit</p>
                      </div>
                      <div className="col s5 m5 right-align">
                        <h5 className="mb-0">$890</h5>
                        <p className="no-margin">Today</p>
                        <p>$25,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="card-widgets">
              <div className="row">
                <div className="col s12 m4 l4">
                  <ul id="task-card" className="collection with-header">
                    <li className="collection-header teal accent-4">
                      <h4 className="task-card-title">My Task</h4>
                      <p className="task-card-date">Sept 16, 2017</p>
                    </li>
                    <li className="collection-item dismissable">
                      <input type="checkbox" id="task1" />
                      <label htmlFor="task1">
                        Create Mobile App UI.
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Today</span>
                        </Link>
                      </label>
                      <span className="task-cat cyan">Mobile App</span>
                    </li>
                    <li className="collection-item dismissable">
                      <input type="checkbox" id="task2" />
                      <label htmlFor="task2">
                        Check the new API standerds.
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Monday</span>
                        </Link>
                      </label>
                      <span className="task-cat red accent-2">Web API</span>
                    </li>
                    <li className="collection-item dismissable">
                      <input
                        type="checkbox"
                        id="task3"
                        defaultChecked="defaultChecked"
                      />
                      <label htmlFor="task3">
                        Check the new Mockup of ABC.
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Wednesday</span>
                        </Link>
                      </label>
                      <span className="task-cat teal accent-4">Mockup</span>
                    </li>
                    <li className="collection-item dismissable">
                      <input
                        type="checkbox"
                        id="task4"
                        defaultChecked="defaultChecked"
                        disabled="disabled"
                      />
                      <label htmlFor="task4">I did it !</label>
                      <span className="task-cat deep-orange accent-2">
                        Mobile App
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m12 l4">
                  <div id="flight-card" className="card">
                    <div className="card-header deep-orange accent-2">
                      <div className="card-title">
                        <h4 className="flight-card-title">Flight</h4>
                        <p className="flight-card-date">June 18, Thu 04:50</p>
                      </div>
                    </div>
                    <div className="card-content-bg white-text">
                      <div className="card-content">
                        <div className="row flight-state-wrapper">
                          <div className="col s5 m5 l5 center-align">
                            <div className="flight-state">
                              <h4 className="margin">LDN</h4>
                              <p className="ultra-small">London</p>
                            </div>
                          </div>
                          <div className="col s2 m2 l2 center-align">
                            <i className="material-icons flight-icon">
                              local_airport
                            </i>
                          </div>
                          <div className="col s5 m5 l5 center-align">
                            <div className="flight-state">
                              <h4 className="margin">SFO</h4>
                              <p className="ultra-small">San Francisco</p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s6 m6 l6 center-align">
                            <div className="flight-info">
                              <p className="small">
                                <span className="grey-text text-lighten-4">
                                  Depart:
                                </span>{" "}
                                04.50
                              </p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">
                                  Flight:
                                </span>{" "}
                                IB 5786
                              </p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">
                                  Terminal:
                                </span>{" "}
                                B
                              </p>
                            </div>
                          </div>
                          <div className="col s6 m6 l6 center-align flight-state-two">
                            <div className="flight-info">
                              <p className="small">
                                <span className="grey-text text-lighten-4">
                                  Arrive:
                                </span>{" "}
                                08.50
                              </p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">
                                  Flight:
                                </span>{" "}
                                IB 5786
                              </p>
                              <p className="small">
                                <span className="grey-text text-lighten-4">
                                  Terminal:
                                </span>{" "}
                                C
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m4 l4">
                  <div id="profile-card" className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img
                        className="activator"
                        src={userbg}
                        alt="user bg"
                      ></img>
                    </div>
                    <div className="card-content">
                      <img
                        src={avatar}
                        alt=""
                        className="circle responsive-img activator card-profile-image cyan lighten-1 padding-2"
                      ></img>
                      <Link
                        to=""
                        className="btn-floating activator btn-move-up waves-effect waves-light red accent-2 z-depth-4 right"
                      >
                        <i className="material-icons">edit</i>
                      </Link>
                      <span className="card-title activator grey-text text-darken-4">
                        Roger Waters
                      </span>
                      <p>
                        <i className="material-icons">perm_identity</i> Project
                        Manager
                      </p>
                      <p>
                        <i className="material-icons">perm_phone_msg</i> +1
                        (612) 222 8989
                      </p>
                      <p>
                        <i className="material-icons">email</i>{" "}
                        yourmail@domain.com
                      </p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">
                        Roger Waters
                        <i className="material-icons right">close</i>
                      </span>
                      <p>Here is some more information about this card.</p>
                      <p>
                        <i className="material-icons">perm_identity</i> Project
                        Manager
                      </p>
                      <p>
                        <i className="material-icons">perm_phone_msg</i> +1
                        (612) 222 8989
                      </p>
                      <p>
                        <i className="material-icons">email</i>{" "}
                        yourmail@domain.com
                      </p>
                      <p>
                        <i className="material-icons">cake</i> 18th June 1990
                      </p>
                      <p></p>
                      <p>
                        <i className="material-icons">airplanemode_active</i>{" "}
                        BAR - AUS
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="work-collections">
              <div className="row">
                <div className="col s12 m12 l6">
                  <ul id="projects-collection" className="collection z-depth-1">
                    <li className="collection-item avatar">
                      <i className="material-icons cyan circle">card_travel</i>
                      <h6 className="collection-header m-0">Projects</h6>
                      <p>Your Favorites</p>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s9">
                          <p className="collections-title">Web App</p>
                          <p className="collections-content">AEC Company</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat cyan">Development</span>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s9">
                          <p className="collections-title">
                            Mobile App for Social
                          </p>
                          <p className="collections-content">iSocial App</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat red accent-2">UI/UX</span>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s9">
                          <p className="collections-title">Website</p>
                          <p className="collections-content">MediTab</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat teal accent-4">
                            Marketing
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s9">
                          <p className="collections-title">AdWord campaign</p>
                          <p className="collections-content">True Line</p>
                        </div>
                        <div className="col s3">
                          <span className="task-cat deep-orange accent-2">
                            SEO
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m12 l6">
                  <ul id="issues-collection" className="collection z-depth-1">
                    <li className="collection-item avatar">
                      <i className="material-icons red accent-2 circle">
                        bug_report
                      </i>
                      <h6 className="collection-header m-0">Issues</h6>
                      <p>Assigned to you</p>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#102</strong> Home Page
                          </p>
                          <p className="collections-content">Web Project</p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat deep-orange accent-2">
                            P1
                          </span>
                        </div>
                        <div className="col s3">
                          <div className="progress">
                            <div
                              className="determinate"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#108</strong> API Fix
                          </p>
                          <p className="collections-content">API Project </p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat cyan">P2</span>
                        </div>
                        <div className="col s3">
                          <div className="progress">
                            <div
                              className="determinate"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#205</strong> Profile page css
                          </p>
                          <p className="collections-content">New Project </p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat red accent-2">P3</span>
                        </div>
                        <div className="col s3">
                          <div className="progress">
                            <div
                              className="determinate"
                              style={{ width: "95%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="collection-item">
                      <div className="row">
                        <div className="col s7">
                          <p className="collections-title">
                            <strong>#188</strong> SAP Changes
                          </p>
                          <p className="collections-content">SAP Project</p>
                        </div>
                        <div className="col s2">
                          <span className="task-cat teal accent-4">P1</span>
                        </div>
                        <div className="col s3">
                          <div className="progress">
                            <div
                              className="determinate"
                              style={{ width: "10%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        
        </section>
      </div>
    );
  }
}

export default HomeScreen;
