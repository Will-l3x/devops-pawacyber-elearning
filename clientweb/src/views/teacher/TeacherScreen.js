import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import TeacherCourseCard from "./TeacherCourseCard";
import { TeacherService } from "../../services/teacher";
import Footer from "../../components/footer";
import Header from "../../components/header";


export class TeacherScreen extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    this.setState({
      courses: [
        {
          courseId: 1,
          courseName: "Mathematics",
          numberOfTopics: 5,
          courseCode: 1234,
        },
        {
          courseId: 2,
          courseName: "Mathematics",
          numberOfTopics: 7,
          courseCode: 123,
        },
        {
          courseId: 3,
          courseName: "Advanced Mathematics",
          numberOfTopics: 9,
          courseCode: 1456,
        },
      ],
    });
    TeacherService.get_all_courses().then((courses) => {
      console.log(courses);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <aside id="left-sidebar-nav">
              <SideBar></SideBar>
              <Link
                to=""
                data-target="slide-out"
                className="sidebar-collapse waves-effect dropdown-trigger waves-block waves-light hide-on-large-only"
              >
                <i className="material-icons">format_indent_increase</i>
              </Link>
            </aside>
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                    maxWidth: "85%",
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
              </div>

              <section id="content" style={{ paddingTop: "1%" }}>
                <div className="container">
                  <div className="card-stats">
                    <div className="row">
                      <TeacherCourseCard courses={this.state.courses} />
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

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TeacherScreen);
