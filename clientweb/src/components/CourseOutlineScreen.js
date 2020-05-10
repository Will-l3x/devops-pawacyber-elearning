import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import $ from "jquery";
import M from "materialize-css";
import DropZone from "./dropzone";

export class CourseOutlineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "Course name",
        topics: [
          {
            id: "1",
            title: "first",
            material: [
              {
                id: "1.1",
                title: "Sub Topic 1",
                addMaterial: [],
              },
              {
                id: "1.2",
                title: "Sub Topic 2",
                addMaterial: [],
              },
              {
                id: "1.3",
                title: "Sub Topic 3",
                addMaterial: [],
              },
            ],
          },
          {
            id: "2",
            title: "Second",
            material: [
              {
                id: "2.1",
                title: "Sub Topic 1",
                chapter: "1",
                addMaterial: [],
              },
              {
                id: "2.2",
                title: "Sub Topic 2",
                addMaterial: [],
              },
              {
                id: "2.3",
                title: "Sub Topic 3",
                addMaterial: [],
              },
            ],
          },
        ],
      },
    };
  }
  componentDidMount() {
    M.AutoInit();
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
    });
  }
  render() {
    const topics = this.state.course.topics.map((topic) => (
      <li key={topic.id}>
        <div className="collapsible-header">
          <i className="material-icons">add</i>
          First
          <span className="badge">3 sub topics</span>
        </div>

        <div className="collapsible-body">
          <ul className="collapsible">
            {topic.material.map((m) => (
              <li key={m.id} className="">
                <div className="collapsible-header">
                  <i className="material-icons">add</i>
                  {m.title}
                  <span className="badge">1</span>
                </div>
                <div className="collapsible-body no-padding">
                  <div className="collection">
                    <div
                      className="lecture-container lecture-container--preview collection-item"
                      data-purpose="lecture-item-1-1"
                    >
                      <div className="left-content">
                        <span className="udi udi-play-circle"></span>
                        <div className="top">
                          <div className="description collapse in">
                            <p>
                              Welcome to this course!&nbsp;Let me introduce
                              myself and explain what the course is about!
                            </p>
                          </div>
                          <div className="title">
                            <Link to="">Course Introduction</Link>{" "}
                            <Link className="down-arrow" to="">
                              <span
                                aria-label="Show description"
                                data-purpose="lecture-caret-1-1"
                                className="udi udi-caret-down"
                              ></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="details">
                        <Link data-purpose="preview-course" to="">
                          <span className="preview-text">Preview</span>
                        </Link>
                        <span className="content-summary">00:57</span>
                      </div>
                    </div>
                    <Link to="#!" className="collection-item">
                      <span className="new badge">4</span>Alan
                    </Link>
                    <Link to="#!" className="collection-item">
                      Alan
                    </Link>
                    <Link to="#!" className="collection-item">
                      <span className="badge">14</span>Alan
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
    ));

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
                      className="btn dropdown-settings dropdown-trigger waves-effect waves-light gradient-45deg-light-blue-cyan breadcrumbs-btn right"
                      to="#!"
                      data-target="dropdown1"
                    >
                      <i className="material-icons ">settings</i>
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
                      Summary
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
            </div>

            <ul className="collapsible">{topics}</ul>

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
                        <label htmlFor="description">Description</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <DropZone />
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
