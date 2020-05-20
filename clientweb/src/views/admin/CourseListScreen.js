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
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";

export class CourseListScreen extends Component {
  constructor() {
    super();
    this.state = {
      courses: [
        { id: "1", title: "Course Name 1", img: blog_1 },
        { id: "2", title: "Course Name 2", img: blog_2 },
        { id: "3", title: "Course Name 3", img: blog_3 },
        { id: "4", title: "Course Name 4", img: blog_4 },
        { id: "5", title: "Course Name 5", img: blog_5 },
        { id: "6", title: "Course Name 6", img: blog_6 },
      ],
    };
    this.removeMaterialHandler.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
    });
  };
  removeItemHandler = (id) => {
    let courses = [];
    for (const course of this.state.courses) {
      if (id === course.id) {
        console.log(id + " removed");
        M.toast({
          html: `${course.title} successfully removed!`,
          classes: "green accent-3",
        });
      } else {
        courses.push(course);
      }
    }
    this.setState({ courses });
  };
  render() {
    /*
    if(school is regestering ) redirect to course register else course out line;
    when school registers see more detailed content about couse, allowed to wiew maybe first topic only
    click register they see subcripion prices and register
   */
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      to="#"
                      style={{ marginTop: "3%" }}
                      className="brand-logo"
                    >
                      Course Management
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      style={{ marginTop: "2%", marginRight: "2%" }}
                      data-target="dropdown1"
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
                          Add Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#!"
                          onClick={this.removeMaterialHandler}
                          className="grey-text text-darken-2"
                        >
                          <i className="material-icons ">delete</i>
                          Delete Course
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <section id="content" style={{ paddingTop: "2%" }}>
                <div id="overviews" className="section wb">
                  <div className="container">
                    <div className="row">
                      {this.state.courses.map((course, i) => (
                        <div key={i} className="col l3">
                          <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                              <img src={course.img} alt="alt" />
                            </div>
                            <div className="card-content">
                              <Link
                                to="#"
                                className="card-title grey-text text-darken-4"
                                style={{ cursor: "unset" }}
                              >
                                {course.title}
                                <i
                                  className="material-icons red-text right remove-content"
                                  data-position="right"
                                  onClick={() => {
                                    this.removeItemHandler(course.id);
                                  }}
                                >
                                  delete_forever
                                </i>
                              </Link>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                              </p>
                              <hr className="invis"></hr>
                              <p>
                                <Link
                                  onClick={() => {
                                    console.log(
                                      "action for which course was clicked and for who clicked and for who if"
                                    );
                                  }}
                                  className="cyan-text"
                                  to="/course-outline"
                                >
                                  View Content
                                </Link>
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
                                  <i
                                    className="fa fa-book"
                                    aria-hidden="true"
                                  ></i>{" "}
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

                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Add Course</h4>
                    <div className="row">
                      <div className="col s12">
                          <div className="row">
                            <div className="input-field col s4">
                              <input id="title2" type="text"></input>
                              <label htmlFor="title2">Title</label>
                            </div>
                            <div className="input-field col s4">
                              <input type="text" id="num_of_topics"></input>
                              <label htmlFor="short_descrip">
                                Number of Topics
                              </label>
                            </div>
                            <div className="input-field col s4">
                              <input id="course_duration" type="text"></input>
                              <label htmlFor="course_duration">
                                Duration (weeks)
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s9">
                              <input type="text" id="short_descrip"></input>
                              <label htmlFor="short_descrip">
                                Short Description
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <FileDropZone />
                              <label style={{ transform: "translateY(-100%)" }}>
                                {" "}
                                <i className="material-icons left">
                                  photo
                                </i>{" "}
                                Cover Image
                              </label>
                            </div>
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
              </section>
            </div>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CourseListScreen);
