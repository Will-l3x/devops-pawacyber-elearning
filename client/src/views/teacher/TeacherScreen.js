import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SideBar from "../../components/SideBar";
import TeacherCourseCard from "./TeacherCourseCard";
import Footer from "../../components/footer";
import Header from "../../components/header";
import TeacherActions from "../../actions/teacher";
export class TeacherScreen extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar data={this.props} />

            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",

                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "3%", marginBottom: "1%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Dashboard
                    </Link>
                  </div>
                </nav>
                <div className="progress display-none">
                  <div className="indeterminate"></div>
                </div>
              </div>

              <section id="content" style={{ paddingTop: "1%" }}>
                <div className="container">
                  <div className="card-stats">
                    <div className="row">
                      <TeacherCourseCard />
                    </div>
                  </div>
                  <div id="work-collections">
                    <div className="row">
                      <div className="col s12 m12 l6">
                        <ul className="task-card collection with-header">
                          <li className="collection-header blue lighten-1">
                            <h5 className="task-card-title">
                              Student classwork
                            </h5>
                            <p className="task-card-title">Todo List</p>
                          </li>
                          <li className="collection-item dismissable">
                            <label htmlFor="task1">
                              Mark Assignment 1
                              <input id="task1" type="checkbox" />
                              <Link to="" className="secondary-content">
                                <span className="ultra-small">Today</span>
                              </Link>
                            </label>
                            <span className="task-cat cyan">
                              Mathematics 4a
                            </span>
                          </li>
                          <li className="collection-item dismissable">
                            <label htmlFor="task2">
                              Mark Assignment 3
                              <Link to="" className="secondary-content">
                                <span className="ultra-small">Monday</span>
                              </Link>
                            </label>
                            <span className="task-cat red accent-2">
                              Computer Science 12c
                            </span>
                          </li>
                          <li className="collection-item">
                            <label htmlFor="task3">
                              Grade Assignment 1
                              <Link to="" className="secondary-content">
                                <span className="ultra-small">Wednesday</span>
                              </Link>
                            </label>
                            <span className="task-cat teal accent-4">
                              Mathematics 4a
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="col s12 m12 l6">
                        <ul className="task-card collection with-header">
                          <li className="collection-header teal accent-4">
                            <h5 className="task-card-title">
                              Pending Assignments
                            </h5>
                            <p className="task-card-title">
                              Arranged by submission date
                            </p>
                          </li>
                          <li className="collection-item dismissable">
                            <label htmlFor="task1">
                              Create Mobile App UI.
                              <Link to="" className="secondary-content">
                                <span className="ultra-small">Today</span>
                              </Link>
                            </label>
                            <span className="task-cat cyan">Mathematics</span>
                          </li>
                          <li className="collection-item dismissable">
                            <label htmlFor="task2">
                              Check the new API standerds.
                              <Link to="" className="secondary-content">
                                <span className="ultra-small">Monday</span>
                              </Link>
                            </label>
                            <span className="task-cat red accent-2">
                              Computer Science
                            </span>
                          </li>
                          <li className="collection-item dismissable">
                            <label htmlFor="task3">
                              Check the new Mockup of ABC.
                              <Link to="" className="secondary-content">
                                <span className="ultra-small">Wednesday</span>
                              </Link>
                            </label>
                            <span className="task-cat teal accent-4">
                              Project
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = Object.assign({}, TeacherActions);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeacherScreen)
);
