import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import FileDropZone from "../../components/dropzone";
import Footer from "../../components/footer";
import Header from "../../components/header";
import SubscribedCoursesCard from "./SubscribedCoursesCard";
//import Pricing from "../../components/pricing";

export class CourseSubscriptionScreen extends Component {
  constructor() {
    super();
    this.state = {
      unsubscribe: false,
    };
    this.handleUnsubscribe.bind(this);
  }
  handleUnsubscribe = () => {
    this.setState({ unsubscribe: true });
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
            <SideBar />
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",

                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "4%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Course Subscription
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      data-target="dropdown1"
                      style={{ marginTop: "3%", marginRight: "2%" }}
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
                          to="/school-add-course"
                          className="grey-text text-darken-2"
                        >
                          <i className="material-icons ">add_box</i>
                          Add Course
                        </Link>
                      </li>

                      <li>
                        <Link onClick={this.handleUnsubscribe} to="#!" className="grey-text text-darken-2">
                          <i className="material-icons ">low_priority</i>
                          Unsubscribe
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <section id="content">
                <div
                  id="overviews"
                  className="section wb"
                  style={{ paddingTop: 15 }}
                >
                  <SubscribedCoursesCard unsubscribe={this.state.unsubscribe} />
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
                            <FileDropZone input_id="file1" />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseSubscriptionScreen);
