import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import blog_1 from "../../assets/images/blog_1.jpg";
import blog_2 from "../../assets/images/blog_2.jpg";
import blog_3 from "../../assets/images/blog_3.jpg";
import blog_4 from "../../assets/images/blog_4.jpg";
import blog_5 from "../../assets/images/blog_5.jpg";
import blog_6 from "../../assets/images/blog_6.jpg";
import FileDropZone from "../../components/dropzone";
import M from "materialize-css";

export class CourseListScreen extends Component {
  images = [blog_1, blog_2, blog_3, blog_4, blog_5, blog_6];
  componentDidMount() {
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
          <div style={{ position: "relative", zIndex: 50 }}>
            <nav
              className="navbar nav-extended"
              style={{
                position: "fixed",
                maxWidth: "85%",
                minHeight: 70,
              }}
            >
              <div className="nav-content">
                <Link to="#" className="brand-logo">
                  Course Management
                </Link>
                <ul id="nav-mobile" className="right">
                  <li>
                    <Link
                      to="#!"
                      className="waves-effect dropdown-trigger"
                      data-target="dropdown1"
                    >
                      <i className="material-icons right">more_vert</i>
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
                          Add Course
                        </Link>
                      </li>
                      <li>
                        <Link to="#!" className="grey-text text-darken-2">
                          <i className="material-icons ">delete</i>
                          Delete Course
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="container" style={{ paddingTop: "2%" }}>
            <div id="overviews" className="section wb">
              <div className="container">
                <div className="row">
                  {this.images.map((image, i) => (
                    <div key={i} className="col s12 m6 l4">
                      <div className="card">
                        <div className="card-image waves-effect waves-block waves-light">
                          <img src={image} alt="alt"></img>
                        </div>
                        <div className="card-content">
                          <Link
                            to="#"
                            className="card-title grey-text text-darken-4"
                            style={{ cursor: "unset" }}
                          >
                            Course Name
                            <i
                              style={{
                                cursor: "pointer",
                                display: "none",
                              }}
                              className="material-icons red-text right tooltipped"
                              data-position="right"
                              data-tooltip="Delete"
                            >
                              delete_forever
                            </i>
                          </Link>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                          <hr className="invis"></hr>
                          <p>
                            <Link to="/course-outline">View Content</Link>
                          </p>
                        </div>
                        <div className="card-action course-meta">
                          <ul>
                            <li>
                              <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                              ></i>
                              6 Month
                            </li>
                            <li>
                              <i
                                className="fa fa-youtube-play"
                                aria-hidden="true"
                              ></i>{" "}
                              56 Video Tutorials
                            </li>
                            <li>
                              <i className="fa fa-book" aria-hidden="true"></i>{" "}
                              7 Chapters
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div id="modal1" className="modal" style={{ overflowY: "hidden" }}>
            <div className="modal-content">
              <h4 className="header2">Add Test/Exercise</h4>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s4">
                      <input id="title2" type="text"></input>
                      <label htmlFor="title2">Title</label>
                    </div>
                    <div className="input-field col s4">
                      <input
                        type="text"
                        name="due_date"
                        className="datepicker"
                      ></input>
                      <label htmlFor="due_date">Due</label>
                    </div>
                    <div className="input-field col s4">
                      <input id="duration" type="text"></input>
                      <label htmlFor="duration">Duration(mins)</label>
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
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CourseListScreen);
