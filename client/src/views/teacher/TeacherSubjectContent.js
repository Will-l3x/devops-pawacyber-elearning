import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SideBar from "../../components/SideBar";
import ShowAllAssignments from "../../components/student-components/showAllAssignments";
import store from "../../config/store";
import Footer from "../../components/footer";
import Header from "../../components/header";
import TeacherResourceCard from "./TeacherResourceCard";

import {StudentService} from '../../services/student';

// Receives subject code and Name only from main screen and retrieves from endpoint the topics of that.
class TeacherSubjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
  }

  componentDidMount() {
    this.videoresources();
  }

  videoresources(){
    const course = store.getState().student.course.course;
      
    if (course === undefined || (course.name === "" || course.name === undefined) ) {
      return <Redirect to="/student" />;
    }
    
    StudentService.get_course_video_resources(course.courseId)
    .then((response) => {
      this.setState({ topics: response })
    });

  }

  videoSelected = false;
  showAssignments = false
  videoAddress = "";
  previewTitle = "";

  selectedTopic(title, video) {
    this.videoAddress = video;
    this.previewTitle = title;
    this.videoSelected = true;
  }

  showAss(){
    this.showAssignments = true;
    this.previewTitle = "ISSUED ASSIGNMENTS"
  }

  render() {
    const course = store.getState().student.course.course;
    if (course === undefined || (course.name === "" || course.name === undefined) ) {
      return <Redirect to="/teacher" />;

    }
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
                            <li className={`collection-header gradient-45deg-light-blue-cyan `} >
                              <p className="task-card-title">
                                {course.name} ASSIGNMENTS
                              </p>
                            </li>
                            <li
                               
                                className="collection-item dismissable"
                              >
                            <label htmlFor="task1">
                                  All Issued Assingments
                                  <Link to="#" onClick={() => this.showAss()} className="secondary-content">
                                    <span style={{ fontSize: "11px" }}>
                                      View
                                    </span>
                                  </Link>
                                </label>
                          </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col s12 m13 l9">
                        <div className="task-card collection with-header">
                          <div className="collection-header gradient-45deg-light-blue-cyan">
                            <p
                              className="task-card-title"
                              style={{ color: "white" }}
                            >
                              {this.videoSelected
                                ? this.previewTitle
                                : this.showAssignments? this.previewTitle:"ISSUED RESOURCES"}
                            </p>
                          </div>
                          { this.showAssignments?(
                            <div
                              className="row mt-1"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              <ShowAllAssignments
                                content={course.courseId}
                              ></ShowAllAssignments>
                            </div>
                          ):(
                            <div
                              className="row mt-1"
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "40px",
                              }}
                            >
                               < TeacherResourceCard></ TeacherResourceCard>
                            </div>
                          )}
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(TeacherSubjectContent);
