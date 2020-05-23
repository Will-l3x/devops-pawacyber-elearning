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

export class StudentScreen extends Component {
  state = {
    courses: [
      {
        id: 1,
        courseName: "COMPUTING",
        numberOfTopics: 5,
        courseCode: 1234,
      },
      {
        id: 2,
        courseName: "MATHEMATICS",
        numberOfTopics: 7,
        courseCode: 123,
      },
      {
        id: 3,
        courseName: "ENGLISH",
        numberOfTopics: 9,
        courseCode: 1456,
      },
      {
        id: 4,
        courseName: "PHYSICS",
        numberOfTopics: 5,
        courseCode: 1098,
      },
    ],
    markedWork: [
      {
        assignmentId: 1,
        courseName: "English Assignment 2",
        score: 50,
      },
      {
        assignmentId: 2,
        courseName: "MATHEMATICS",
        score: 70,
      },
      {
        assignmentId: 3,
        courseName: "COMPUTERS",
        score: 90,
      },
    ],
    pendingWork: [
      {
        assignmentId: 1,
        courseName: "Agriculture",
        dueDate: "13 May 2020",
        submited: true,
      },
      {
        assignmentId: 2,
        courseName: "Maths Homework 1",
        dueDate: "15 May 2020",
        submited: true,
      },
      {
        assignmentId: 3,
        courseName: "English Report",
        dueDate: "05 June 2020",
        submited: false,
      },
      {
        assignmentId: 4,
        courseName: "Physics Report",
        dueDate: " 17 June 2020",
        submited: false,
      },
    ],
  };

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
                      <div className="col s12 m4 l4">
                        <ul className="task-card collection with-header">
                          <li className="collection-header teal accent-4">
                            <h5 className="task-card-title">
                              Pending Assignments
                            </h5>
                            <p className="task-card-title">
                              Arranged by submission date
                            </p>
                          </li>
                          <PendingAssignments
                            pendingWork={this.state.pendingWork}
                          ></PendingAssignments>
                        </ul>
                      </div>
                      <div className="col s12 m12 l6">
                        <ul className="task-card collection with-header">
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
