import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";
import TeacherActions from "../../actions/teacher";
import { TeacherService } from "../../services/teacher";

class TeacherScreen extends Component {
  // Get teacher subjects
  // Get Assignments by subject above
  // Get submissions by Assignement obtained above
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      courses: [],
      assignments: [],
      submissions: [],
    };
  }
  courseId = "";
  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    TeacherService.get_all_courses(this.state.user.userid).then((response) => {
      this.setState({ courses: response });
      if (response.length > 0) {
        this.courseId = response[0].classId;
        TeacherService.get_assignments(this.courseId) //get by course id
          .then((response) => {
            this.setState({ assignments: response });
          });
      }
    });
  }

  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-green-teal",
      "gradient-45deg-indigo-purple",
      "gradient-45deg-purple-amber",
    ];
    /* shuffle array
    colors.sort(function(){
      return .5 -Math.random();
    });
    */
    return colors[i % 5];
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
            <section id="content" style={{ paddingTop: 20 }}>
              <div className="container">
                <div className="card-stats">
                  <div className="row">
                    {this.state.courses.map((course, i) => (
                      <div key={i} className="col s12 m6 l3">
                        <div
                          className={`card border-radius-10 ${this.colors(
                            i
                          )} white-text hovCard`}
                          style={{
                            boxShadow: "100px",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            className="col s9 sub-card center min-height-100"
                            style={{
                              margin: "auto",
                              paddingTop: "25px",
                            }}
                          >
                            <h5 className="white-text">{course.classname}</h5>
                          </div>
                          <div
                            className="col s2 min-height-100"
                            style={{
                              margin: "auto",
                              paddingTop: "30px",
                            }}
                          >
                            <a href="#!">
                              <i
                                className={`material-icons background-round`}
                                style={{ padding: "10px", color: "white" }}
                              >
                                link
                              </i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div id="work-collections">
                  <div className="row">
                    <div className="col s12 l6 border-radius-10">
                      <ul className="task-card collection with-header border-radius-10">
                        <li className="collection-header blue lighten-1">
                          <h5 className="task-card-title">Student classwork</h5>
                        </li>

                        <li className="collection-item dismissable">
                          <label htmlFor="task2">
                            Assignment 1
                            <Link to="#" className="secondary-content">
                              <span className="ultra-small">Due Date</span>
                            </Link>
                          </label>
                          <Link to="#">
                            <span className="task-cat red accent-2">
                              Subject Name
                            </span>
                          </Link>
                        </li>
                        {this.state.assignments.map((assignment, i) => (
                          <li className="collection-item dismissable">
                            <label htmlFor="task2">
                              {assignment.name}
                              <Link to="#" className="secondary-content">
                                <span className="ultra-small">
                                  {" "}
                                  {assignment.date}{" "}
                                </span>
                              </Link>
                            </label>
                            <Link to="#">
                              <span className="task-cat red accent-2">
                                {this.state.courses[0]}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col s12 l6 border-radius-10">
                      <ul className="task-card collection with-header border-radius-10">
                        <li className="collection-header teal accent-4">
                          <h5 className="task-card-title">
                            Student Submissions
                          </h5>
                        </li>

                        <li className="collection-item dismissable">
                          <label htmlFor="task3">
                            Student Name
                            <Link to="#" className="secondary-content">
                              <span className="ultra-small">
                                Submission Date
                              </span>
                            </Link>
                          </label>
                          <Link to="#">
                            <span className="task-cat teal accent-4">
                              Subject Name | Assignment 1
                            </span>
                          </Link>
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

const mapDispatchToProps = Object.assign({}, TeacherActions);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeacherScreen)
);
