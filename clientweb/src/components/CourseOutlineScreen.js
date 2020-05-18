import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
//import $ from "jquery";
import M from "materialize-css";
import FileDropZone from "./dropzone";
import TopicContentCard from "./TopicContentCard";
import Footer from "./footer";
import Header from "./header";

export class CourseOutlineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [
        {
          id: 1,
          title: "Databases",
        },
        {
          id: 2,
          title: "Introduction to Programming",
        },
      ],

      course: {
        id: "1",
        title: "Course Name",
        topic: [
          {
            id: "1.1",
            title: "Topic 1",
            material: [
              {
                id: "1",
                title: "Course Intro",
                period: "week 1",
                doc_path: "path/to/file",
                video_path: "path/to/file",
              },
              {
                id: "11",
                title: "Course Intro",
                period: "week 2",
                doc_path: "path/to/file",
                video_path: "path/to/file",
              },
            ],
          },
          {
            id: "1.2",
            title: "Topic 2",
            material: [
              {
                id: "2",
                title: "Course Intro",
                period: "week 3 & 4",
                doc_path: "path/to/file",
                video_path: "path/to/file",
              },
              {
                id: "12",
                title: "Course Intro",
                period: "week 5",
                doc_path: "path/to/file",
                video_path: "path/to/file",
              },
            ],
          },
          {
            id: "1.3",
            title: "Topic 3",
            material: [
              {
                id: "3",
                title: "Course Intro",
                period: "week 6-9",
                doc_path: "path/to/file",
                video_path: "path/to/file",
              },
              {
                id: "13",
                title: "Course Intro",
                period: "week 10",
                doc_path: "path/to/file",
                video_path: "path/to/file",
              },
            ],
          },
        ],
      },
    };
  }
  contentSate = {
    content: {
      id: 1,
      topic: "Databases",
      videoLink: "somewhere",
      topicContent:
        "The quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dlshe quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dls",
    },
  };

  topicSelected = false;

  componentDidMount() {
    M.AutoInit();
    /*
    function toggleCourseListIcon() {
      $(".collapsible-header").each(function () {
        if ($(this).hasClass("active")) {
          $(".active .material-icons").text("remove");
        } else {
          $(".active .material-icons").text("remove");
        }
      });
    }
    $(".collapsible-header").click(function () {
      $(this).toggleClass("active");
      toggleCourseListIcon();
    });*/
  }

  selectedTopic() {
    this.topicSelected = true;
  }

  render() {
    console.log(this.props);
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
                <div className="course-item">
                  <div className="all-title-box2">
                    <div className="container">
                      <h1 className="center-align flow-text">
                        List of Course content
                      </h1>
                    </div>
                  </div>
                  <div id="breadcrumbs-wrapper">
                    <div className="row">
                      <div className="col s10 m6 l6">
                        <h2 className="breadcrumbs-title text-darken-2">
                          Course Outline
                        </h2>
                        <ol className="breadcrumbs">
                          <li>
                            <Link to="/courses">Course List</Link>
                          </li>
                          <li className="active">{this.state.course.title}</li>
                        </ol>
                      </div>
                      <div className="col s2 m6 l6">
                        <Link
                          to="#!"
                          className="dropdown-trigger waves-effect black-text right"
                          data-target="dropdown1"
                          style={{ marginTop: "3%" }}
                        >
                          <i className="material-icons">settings</i>
                        </Link>
                        <ul
                          id="dropdown1"
                          className="dropdown-content"
                          style={{
                            minWidth: "200px",
                            whiteSpace: "nowrap",
                            opacity: 1,
                            display: "none",
                          }}
                        >
                          <li>
                            <Link
                              to="#!"
                              data-target="modal1"
                              className="grey-text modal-trigger text-darken-2"
                            >
                              <i className="material-icons ">library_add</i>
                              Add Material
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#!"
                              data-target="modal2"
                              className="grey-text modal-trigger text-darken-2"
                            >
                              <i className="material-icons ">backspace</i>
                              Remove Material
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="course-br">
                    <div className="course-title">
                      <h2>
                        <Link to="" title="">
                          Course introduction
                        </Link>
                      </h2>
                    </div>
                    <div className="course-desc">
                      <p>
                        Lorem ipsum door sit amet, fugiat deicata avise id cum,
                        no quo maiorum intel ogrets geuiat operts elicata libere
                        avisse id cumlegebat, liber regione eu sit....
                      </p>
                    </div>
                  </div>
                  <div className="course-meta-bot">
                    <ul>
                      <li>
                        <i className="fa fa-calendar" aria-hidden="true"></i> 6
                        Month
                      </li>
                      <li>
                        <i
                          className="fa fa-youtube-play"
                          aria-hidden="true"
                        ></i>{" "}
                        56 Video Tutorials
                      </li>
                      <li>
                        <i className="fa fa-book" aria-hidden="true"></i> 7
                        Topics
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="row">
                    <div className="col s12 m2 l3">
                      <ul className="task-card collection with-header">
                        <li className="collection-header gradient-45deg-light-blue-cyan ">
                          <p className="task-card-title">
                            {this.state.course.title} TOPICS
                          </p>
                        </li>
                        {this.state.topics.map((topic, i) => (
                          <li key={i} className="collection-item dismissable">
                            <label htmlFor="task1">
                              {topic.title}
                              {/* Click to view the content by seting state of Topic Name and the content */}
                              <Link
                                to="#"
                                onClick={() => this.selectedTopic()}
                                className="secondary-content"
                              >
                                <span className="ultra-small">VIEW</span>
                              </Link>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col s12 m13 l9">
                      <div className="task-card collection with-header">
                        <div className="collection-header designed-dots">
                          <h5
                            className="task-card-title"
                            style={{ color: "black" }}
                          >
                            {this.topicSelected
                              ? this.contentSate.content.topic
                              : "Select Topic"}
                          </h5>
                        </div>
                        {this.topicSelected ? (
                          <TopicContentCard
                            content={this.contentSate.content}
                          ></TopicContentCard>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Add Course Material</h4>
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <input id="name" type="text"></input>
                            <label htmlFor="first_name">Name</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea
                              id="description"
                              className="materialize-textarea"
                            ></textarea>
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s12">
                            <FileDropZone />
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="modal2" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Delete Course Material</h4>
                    <div className="row">
                      <div className="col s12">
                        <div className="row header-search-wrapper">
                          <i className="material-icons">search</i>
                          <input
                            type="text"
                            name="Search"
                            className="header-search-input z-depth-2"
                            placeholder="Explore Classroom"
                          ></input>

                          <label htmlFor="description">Search File</label>
                        </div>
                        <div className="row">
                          <div className="col s12"></div>
                        </div>

                        <div className="row">
                          <div className="row">
                            <div className="input-field col s12">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseOutlineScreen);
