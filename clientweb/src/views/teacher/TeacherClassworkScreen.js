import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import avatar from "../../assets/images/icon/book_lover.png";
import DatatablePage from "../../components/DatatablePage";
import TeacherCourseCard from "./TeacherCourseCard";
import M from "materialize-css";
export class TeacherClassworkScreen extends Component {
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
  componentWillMount(){
    M.AutoInit()
  }
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
                    to="/teacher-students"
                    className="card btn gradient-45deg-light-blue-cyan"
                    style={{ maxWidth: "150px" }}
                  >
                    All Students
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-stats">
              <div className="row mt-1">
                <TeacherCourseCard courses={this.state.courses} />
              </div>
            </div>
            <div className="card-stats z-depth-5 padding-5">
              <div className="row mt-1">
                <div className="col s12 m6 l12">
                  <DatatablePage />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherClassworkScreen);
