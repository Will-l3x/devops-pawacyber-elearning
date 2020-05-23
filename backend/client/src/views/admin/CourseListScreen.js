import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SideBar from "../../components/SideBar";
import FileDropZone from "../../components/dropzone";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CoursesCard from "./CoursesCard";

export class CourseListScreen extends Component {
  constructor() {
    super();
    this.removeMaterialHandler.bind(this);
  }
  removeMaterialHandler = () => {
    $(".remove-content").css({
      display: "inline",
    });
  };
  componentDidMount() {
    M.AutoInit();
  }

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
                  <CoursesCard />
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
                              <i className="material-icons left">photo</i> Cover
                              Image
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
