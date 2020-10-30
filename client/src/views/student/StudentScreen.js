import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import { course_data } from "../../actions/student";

import StudentCourseCard from "../../components/student-components/studentCourseCard";
import StudyMaterialCard from "../../components/student-components/StudyMaterialCard";
import PendingAssignments from "../../components/student-components/Assignments";
import MarkedAssignments from "../../components/student-components/MarkedAssignmentsCard";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { StudentService } from "../../services/student";
import { TeacherService } from "../../services/teacher"
import { isEmpty } from "lodash";

class StudentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      markedWork: [],
      pendingWork: [],
      del_courses: []
    };
  }

  user = {};
  studentData = {};

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.studentData = JSON.parse(localStorage.getItem("userAll"));

    localStorage.setItem("registrationData", JSON.stringify({ gradeid: this.studentData.gradeid }));

    StudentService.get_all_courses(this.studentData.studentId) // by student id
      .then((response) => {
        const courses = [];
        var assignments = [];
        const assTemp = [];
        const del_courses = [];
        for (const course of response) {
          if (course.status === "deleted") {
            del_courses.push(course);
          } else {
            courses.push(course);
          }
        }

        this.setState({ courses, del_courses });
        for (const sub of response) {
          this.courseId = sub.classId;
          TeacherService.get_assignments(this.courseId)
            .then((data) => {

              // assignments.push(data);   
              if (isEmpty(data)) {

              } else {
                assignments = assTemp.concat(data);
                this.setState({ pendingWork: assignments.reverse() });
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar data={this.props} />

            <section id="content">
              <div className="container">
                <div className="card-stats">
                  <div className="row mt-1">
                    <StudentCourseCard
                      courses={this.state.courses}
                    ></StudentCourseCard>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "15px",
                  }}
                >
                  <StudyMaterialCard></StudyMaterialCard>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m6">
                        <ul className="task-card collection with-header border-radius-10">
                          <li className="collection-header teal accent-4">
                            <h5 className="task-card-title">
                              All Assignments
                            </h5>
                            <p className="task-card-title">
                              Arranged by upload date
                            </p>
                          </li>
                          <PendingAssignments
                            pendingWork={this.state.pendingWork}
                          ></PendingAssignments>
                        </ul>
                      </div>
                      <div className="col s12 m6">
                        <ul className="task-card collection with-header border-radius-10">
                          <li className="collection-header gradient-45deg-light-blue-cyan accent-4">
                            <h5 className="task-card-title">
                              Graded Assignments
                            </h5>
                            <p className="task-card-title">
                              Overview for your marked assignments
                            </p>
                          </li>
                          <MarkedAssignments
                            markedWork={this.state.markedWork}
                          ></MarkedAssignments>
                        </ul>
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

const mapDispatchToProps = { course_data };

export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen);
