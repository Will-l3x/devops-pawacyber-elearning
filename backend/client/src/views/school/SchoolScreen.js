/**
 * home page
 * used by headmaster and school admin staff
 * can register course
 * can manage its teacher list
 * can manage its students list for each course they register
 * info about registered courses/classes
 * Page with classroom teacher/students and their marks
 * table of all students under that school
 * table for all teachers at that school
 **/

import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/header";
import M from "materialize-css";
import { Calendar } from "../../components/calendar";
import { Link } from "react-router-dom";

export class SchoolScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />
            <section id="content">
              <div className="container">
                <div className="card-stats">
                  <div className="row mt-1">
                    <div className="col s12 m6 l6">
                      <div className="col s12 m6 l6">
                        <div className="card gradient-45deg-amber-amber gradient-shadow min-height-100 white-text">
                          <div className="padding-4">
                            <div className="col s7 m7">
                              <i className="material-icons background-round mt-5 white-text">
                                perm_identity
                              </i>
                              <p className="white-text">Students</p>
                            </div>
                            <div className="col s5 m5 right-align white-text">
                              <h5 className="mb-0 white-text">200</h5>
                              <p className="no-margin white-text">New</p>
                              <p className="white-text">2,900</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col s12 m6 l6">
                        <div className="card gradient-45deg-green-teal gradient-shadow min-height-100 white-text">
                          <div className="padding-4">
                            <div className="col s7 m7">
                              <i className="material-icons background-round mt-5 white-text">
                                perm_identity
                              </i>
                              <p className="white-text">Teachers</p>
                            </div>
                            <div className="col s5 m5 right-align white-text">
                              <h5 className="mb-0 white-text">24</h5>
                              <p className="no-margin white-text">New</p>
                              <p className="white-text">120</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col s12 m12 l">
                        <ul className="task-card collection with-header">
                          <li className="collection-header teal accent-4">
                            <h4 className="task-card-title white-text">
                              School Events
                            </h4>
                            <p className="task-card-date ">Sept 16, 2017</p>
                          </li>
                          <li className="collection-item dismissable">
                            <input type="checkbox" id="task1" />
                            <label htmlFor="task1">
                              Consultation Day.
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">Today</span>
                              </Link>
                            </label>
                            <span className="task-cat cyan">Event</span>
                          </li>
                          <li className="collection-item dismissable">
                            <input type="checkbox" id="task2" />
                            <label htmlFor="task2">
                              Examination Start.
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">Monday</span>
                              </Link>
                            </label>
                            <span className="task-cat red accent-2">
                              Examination
                            </span>
                          </li>
                          <li className="collection-item">
                            <input type="checkbox" id="task3" />
                            <label htmlFor="task3">
                              School Closing Day
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">Thursay</span>
                              </Link>
                            </label>
                            <span className="task-cat teal accent-4">
                              Closing Day
                            </span>
                          </li>
                          <li className="collection-item">
                            <input type="checkbox" id="task4" />
                            <label htmlFor="task4">
                              School Openning Day
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">Thursay</span>
                              </Link>
                            </label>
                            <span className="task-cat teal accent-4">
                              Openning Day
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col s12 m6 l6">
                      <div className="card padding-1">
                        <Calendar />
                      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolScreen);