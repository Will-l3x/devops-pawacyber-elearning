import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
//import $ from "jquery";
import M from "materialize-css";
import FileDropZone from "./dropzone";

export class CourseOutlineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course:   {
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
    this.topics.bind(this);
    this.courseMaterial.bind(this);
  }
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

  topics = (sub) => {
    return sub.map((topic) => (
      <li key={topic.id} className="">
        <div className="collapsible-header">
          <i className="material-icons">add</i>
          {topic.title}
          <span className="badge">1</span>
        </div>
        <div className="collapsible-body no-padding">
          <div className="collection">
            {this.courseMaterial(topic.material)}
          </div>
        </div>
      </li>
    ));
  };
  courseMaterial = (material) => {
    return material.map((material, i) => (
      <div
        key={material.id}
        style={{ paddingBottom: 30 }}
        className="collection-item"
      >
        <div
          className="lecture-container lecture-container--preview collection-item"
          data-purpose="lecture-item-1-1"
        >
          <div className="left-content">
            <div className="top">
              <div className="description collapse in">
                <p>
                  Welcome to this course!&nbsp;Let me introduce myself and
                  explain what the course is about!
                </p>
              </div>
              <div className="title">
                <span className="blue-grey-text">
                  {i + 1}.{material.title}.................
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  {material.period}
                </span>
              </div>
            </div>
          </div>
          <span className="badge">
            <Link
              className="green-text tooltipped"
              data-position="top"
              data-tooltip="Download pdf"
              to={material.doc_path}
            >
              <i className="material-icons">picture_as_pdf</i>
            </Link>
            <Link
              className="blue-text tooltipped"
              data-position="top"
              data-tooltip="Download video"
              to={material.video_path}
            >
              <i className="material-icons">ondemand_video</i>
            </Link>
          </span>
        </div>
      </div>
    ));
  };
  render() {
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
          <Link
            to=""
            data-target="slide-out"
            className="waves-effect sidenav-trigger gradient-45deg-light-blue-cyan waves-block waves-light hide-on-large-only"
          >
            <i className="material-icons">format_indent_increase</i>
          </Link>
        </aside>

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
                      className="btn dropdown-settings dropdown-trigger waves-effect waves-light gradient-45deg-blue-grey-blue-grey breadcrumbs-btn right"
                      to="#!"
                      data-target="dropdown1"
                    >
                      <i className="material-icons">library_add</i>
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
                    Lorem ipsum door sit amet, fugiat deicata avise id cum, no
                    quo maiorum intel ogrets geuiat operts elicata libere avisse
                    id cumlegebat, liber regione eu sit....{" "}
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
                    <i className="fa fa-youtube-play" aria-hidden="true"></i> 56
                    Video Tutorials
                  </li>
                  <li>
                    <i className="fa fa-book" aria-hidden="true"></i> 7 Topics
                  </li>
                </ul>
              </div>
              <div className="course-meta-bot" style={{ paddingBottom: 10 }}>
                <div className="row">
                  <div className="col m12">
                    <h5 className="breadcrumbs-title center-align text-darken-2">
                      Topics
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <ul
              className="collapsible"
              style={{ margin: 0, border: "1px solid #4babb1", borderTop: 0 }}
            >
              {this.topics(this.state.course.topic)}
            </ul>

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
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseOutlineScreen);
