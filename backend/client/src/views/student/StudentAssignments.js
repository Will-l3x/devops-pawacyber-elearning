import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";

export class StudentAssignments extends Component {
  assignmentCategory = "ALL ASSIGNMENTS";
  status = "All";

  selectCategory(category, stat) {
    this.assignmentCategory = category;
    this.status = stat;
  }

  state = {
    assignment: [
      {
        id: 1,
        assignmentTitle: "Assignment 1",
        assignmentLink: "path/to/assigment1",
        assignmentStatus: "Submitted",
        date: "10-05-2020",
        score: "75%",
      },
      {
        id: 2,
        assignmentTitle: "Assignment 2",
        assignmentLink: "path/to/assigment2",
        assignmentStatus: "Pending",
        date: "20-05-2020",
        score: "",
      },
      {
        id: 3,
        assignmentTitle: "Assignment 3",
        assignmentLink: "path/to/assigment3",
        assignmentStatus: "Submitted",
        date: "14-05-2020",
        score: "",
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
              <SideBar/>
              
            <section id="content">
              <div className="container">
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m2 l3">
                        <div className="column">
                          <ul className="task-card collection with-header">
                            <li className={`collection-header teal `}>
                              <p className="task-card-title">ASSIGNMENTS</p>
                            </li>
                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                Pending Assignments
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "Pending Assignments",
                                      "Pending"
                                    )
                                  }
                                  className="secondary-content"
                                >
                                  <span className="ultra-small">VIEW</span>
                                </Link>
                              </label>
                            </li>

                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                Submitted Assignments
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "Submitted Assignments",
                                      "Submitted"
                                    )
                                  }
                                  className="secondary-content"
                                >
                                  <span className="ultra-small">VIEW</span>
                                </Link>
                              </label>
                            </li>
                            <li className="collection-item dismissable">
                              <label htmlFor="task1">
                                Submit New Assignment
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.selectCategory(
                                      "Submit New Assignment",
                                      "Pending"
                                    )
                                  }
                                  className="secondary-content"
                                >
                                  <span className="ultra-small">Submit</span>
                                </Link>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col s12 m13 l9">
                        <div className="task-card collection with-header">
                          <div className="collection-header teal">
                            <p
                              className="task-card-title"
                              style={{ color: "white" }}
                            >
                              {this.assignmentCategory}
                            </p>
                          </div>
                          <div
                            className="row mt-1"
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {this.state.assignment.map((assigment, i) => {
                              console.log(this.status);
                              if (this.status === "All") {
                                return (
                                  <div key={i} className="col s12 m8 l4">
                                    <div
                                      className="card min-height-100 white-text designed-dots"
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <div className="padding-4">
                                        <div className="col s12 m12">
                                          <p
                                            className="no-margin"
                                            style={{ color: "teal" }}
                                          >
                                            <b>{assigment.assignmentTitle}</b>
                                          </p>
                                          <p
                                            className="no-margin"
                                            style={{
                                              fontSize: "12px",
                                              color: "grey",
                                            }}
                                          >
                                            {assigment.date}
                                          </p>
                                          <p
                                            className={
                                              assigment.assignmentStatus ===
                                              "Pending"
                                                ? "red"
                                                : "gradient-45deg-light-blue-cyan"
                                            }
                                            style={{ paddingLeft: "5px" }}
                                          >
                                            {assigment.score !== ""
                                              ? `Graded: ${assigment.score}`
                                              : `${assigment.assignmentStatus}`}
                                          </p>
                                        </div>
                                        <div
                                          className="right-align"
                                          style={{
                                            marginTop: "70px",
                                            color: "black",
                                          }}
                                        >
                                          <p className="no-margin">DOWNLOAD</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                if (
                                  assigment.assignmentStatus === this.status
                                ) {
                                  return (
                                    <div key={i} className="col s12 m8 l4">
                                      <div
                                        className="card min-height-100 white-text designed-dots"
                                        style={{ borderRadius: "5px" }}
                                      >
                                        <div className="padding-4">
                                          <div className="col s12 m12">
                                            <p
                                              className="no-margin"
                                              style={{ color: "teal" }}
                                            >
                                              <b>{assigment.assignmentTitle}</b>
                                            </p>
                                            <p
                                              className="no-margin"
                                              style={{
                                                fontSize: "12px",
                                                color: "grey",
                                              }}
                                            >
                                              {assigment.date}
                                            </p>
                                            <p
                                              className={
                                                assigment.assignmentStatus ===
                                                "Pending"
                                                  ? "red"
                                                  : "gradient-45deg-light-blue-cyan"
                                              }
                                              style={{ paddingLeft: "5px" }}
                                            >
                                              {assigment.score !== ""
                                                ? `Graded: ${assigment.score}`
                                                : `${assigment.assignmentStatus}`}
                                            </p>
                                          </div>
                                          <div
                                            className="right-align"
                                            style={{
                                              marginTop: "70px",
                                              color: "black",
                                            }}
                                          >
                                            <p className="no-margin">
                                              {this.assignmentCategory ===
                                              "Submit New Assignment"
                                                ? "UPLOAD"
                                                : "DOWNLOAD"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                return 1;
                              }
                            })}
                          </div>
                        </div>
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

export default connect(null, null)(StudentAssignments);
