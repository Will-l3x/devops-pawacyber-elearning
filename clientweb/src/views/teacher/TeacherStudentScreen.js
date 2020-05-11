import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import TeacherCourseCard from "./TeacherCourseCard";
import M from "materialize-css";
export class TeacherStudentScreen extends Component {
  constructor(){
    super();
    this.state = {
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
  }
  
  componentWillMount() {
    M.AutoInit();
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
            <div id="card-stats">
              <div className="row mt-1">
                <TeacherCourseCard courses={this.state.courses} />
              </div>
            </div>
            <div id="card-stats" className="z-depth-5 padding-5">
              <div className="row mt-1">
                <div className="col s12 m6 l12">
                  <div className="center-align flow-text">Students List</div>
                  <hr className="hr4"></hr>
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
)(TeacherStudentScreen);
