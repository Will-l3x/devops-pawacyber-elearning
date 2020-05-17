import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SubjectDescrip from "../../components/student-components/SubjectDescrip";
import store from "../../config/store";
import Footer from "../../components/footer";
import Header from "../../components/header";
import VideoPriview from "../../components/student-components/VideoPreview";

// Receives subject code and Name only from main screen and retrieves from endpoint the topics of that.
export class SubjectContent extends Component {
  state = {
    topics: [
      {
        id: 1,
        title: "Databases",
        videoLink:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      },
      {
        id: 2,
        title: "Introduction to Programming",
        videoLink:"http://media.w3.org/2010/05/bunny/movie.mp4"
      },
      {
        id: 2,
        title: "Advanced Programming 1",
        videoLink:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      },
    ],
  };

  videoSelected = false;
  videoAddress = "";
  previewTitle = "";
  selectedTopic(title, video) {
    this.videoAddress = video;
    this.previewTitle = title;
    this.videoSelected = true;
  }

  render() {
    console.log(this.props);
    const course = store.getState().student.course;
    if (course.name === "" || course.name === undefined) {
      return <Redirect to="/student" />;
    }
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
            <section id="content">
              <div className="container">
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m2 l3">
                        <div className="column">
                          <ul className="task-card collection with-header">
                            <li
                              className={`collection-header ${course.color} `}
                            >
                              <p className="task-card-title">
                                {course.name} VIDEOS
                              </p>
                            </li>
                            {this.state.topics.map((topic, i) => (
                              <li
                                key={i}
                                className="collection-item dismissable"
                              >
                                <label htmlFor="task1">
                                  {topic.title}
                                  {/* Click to view the content by seting state of Topic Name and the content */}
                                  <Link
                                    to="#"
                                    onClick={() => this.selectedTopic()}
                                    className="secondary-content"
                                  >
                                    <span style={{ fontSize: "11px" }}>
                                      Watch
                                    </span>
                                  </Link>
                                </label>
                              </li>
                            ))}
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
                              {this.videoSelected
                                ? this.contentSate.content.topic
                                : "DOWNLOADABLE RESOURCES"}
                            </p>
                          </div>
                          {this.videoSelected ? (
                            <div></div>
                          ) : (
                            <div
                              className="row mt-1"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              <SubjectDescrip
                                content={course.courseId}
                              ></SubjectDescrip>
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

export default connect(mapStateToProps, null)(SubjectContent);
