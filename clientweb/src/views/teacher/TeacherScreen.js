import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import TeacherCourseCard from "./TeacherCourseCard";
import avatar from "../../assets/images/icon/book_lover.png";

export class TeacherScreen extends Component {
  state = {
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
  };

  render() {
    return (
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

        <section id="content">
          <div className="container">
            <div id="card-stats">
              <div className="row mt-1">
                <p className="flow-text">Your Teaching Classes</p>
                <TeacherCourseCard courses={this.state.courses} />
              </div>
            </div>
            <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <div
                className="row card"
                style={{
                  backgroundImage:
                    'url("../../assets/images/icon/book_lover.png")',
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                <div
                  className="col s2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={avatar}
                    alt="Avatar"
                    style={{
                      flexShrink: "0",
                      maxWidth: "100%",
                      maxHeight: "80px",
                    }}
                  ></img>
                </div>
                <div className="col s6 card-title">
                  <div
                    style={{
                      fontSize: "16px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    Student assessment. View your students' classwork.
                  </div>
                </div>
                <div
                  className="col s4"
                  style={{ paddingTop: "1.4%", paddingBottom: "1.3%" }}
                >
                  <div className="right-align">
                    <Link
                      to=""
                      className="card btn gradient-45deg-light-blue-cyan"
                      style={{ maxWidth: "150px" }}
                    >
                      All Students
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div id="work-collections">
              <div className="row">
                <div className="col s12 m12 l6">
                  <ul id="task-card" className="collection with-header">
                    <li className="collection-header blue lighten-1">
                      <h5 className="task-card-title">Student classwork</h5>
                      <p className="task-card-title">Todo List</p>
                    </li>
                    <li className="collection-item dismissable">
                      <label htmlFor="task1">
                        Mark Assignment 1
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Today</span>
                        </Link>
                      </label>
                      <span className="task-cat cyan">Mathematics 4a</span>
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
                  <ul id="task-card" className="collection with-header">
                    <li className="collection-header teal accent-4">
                      <h5 className="task-card-title">Pending Assignments</h5>
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
                      <span className="task-cat teal accent-4">Project</span>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TeacherScreen);
