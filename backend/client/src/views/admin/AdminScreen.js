import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import Footer from "../../components/footer";

export class AdminScreen extends Component {
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar data={this.props}></SideBar>

            <section id="content">
              <div className="container">
                <div className="card-stats">
                  <div className="row mt-1">
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              add_shopping_cart
                            </i>
                            <p className="white-text">Orders</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">690</h5>
                            <p className="no-margin white-text">New</p>
                            <p className="white-text">6,00,00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-red-pink gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              perm_identity
                            </i>
                            <p className="white-text">Clients</p>
                          </div>
                          <div className="col s5 m5 right-align white-text">
                            <h5 className="mb-0 white-text">1885</h5>
                            <p className="no-margin white-text">New</p>
                            <p className="white-text">1,12,900</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-amber-amber gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              timeline
                            </i>
                            <p className="white-text">Sales</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">80%</h5>
                            <p className="no-margin white-text">Growth</p>
                            <p className="white-text">3,42,230</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-green-teal gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5 white-text">
                              attach_money
                            </i>
                            <p className="white-text">Profit</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0 white-text">$890</h5>
                            <p className="no-margin white-text">Today</p>
                            <p className="white-text">$25,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="work-collections">
                  <div className="row">
                    <div className="col s12 m12 l6">
                      <ul className="task-card collection with-header">
                        <li className="collection-header teal accent-4">
                          <h4 className="task-card-title white-text">
                            My Task
                          </h4>
                          <p className="task-card-date ">Sept 16, 2017</p>
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
                    <div className="col s12 m12 l6">
                      <ul
                        id="issues-collection"
                        className="collection z-depth-1"
                      >
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
                              <p className="collections-content">
                                API Project{" "}
                              </p>
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
                              <p className="collections-content">
                                New Project{" "}
                              </p>
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
        </main>

        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);