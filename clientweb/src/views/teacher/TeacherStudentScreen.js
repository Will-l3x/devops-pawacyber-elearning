import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import M from "materialize-css";
export class TeacherStudentScreen extends Component {
  constructor() {
    super();
    this.state = {
      courses: [
        {
          courseId: 1,
          courseName: "Mathematics",
          numberOfTopics: 5,
          courseCode: 1234,
        },
        {
          courseId: 2,
          courseName: "Mathematics",
          numberOfTopics: 7,
          courseCode: 123,
        },
        {
          courseId: 3,
          courseName: "Advanced Mathematics",
          numberOfTopics: 9,
          courseCode: 1456,
        },
      ],
    };
  }

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
                transform: "translateY(-10%)",
              }}
            >
              <div className="nav-content">
                <Link to="#" className="brand-logo">
                  Student Assessment
                </Link>

                <ul
                  id="dropdown7"
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
                      <i className="material-icons ">book</i>
                      Add Material
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#!"
                      data-target="modal2"
                      className="grey-text modal-trigger text-darken-2"
                    >
                      <i className="material-icons ">description</i>
                      Test/Exercise
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#!"
                      data-target="modal3"
                      className="grey-text modal-trigger text-darken-2"
                    >
                      <i className="material-icons ">assignment</i>
                      Add Assignment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#!"
                      className="grey-text remove-material text-darken-2"
                    >
                      <i className="material-icons ">backspace</i>
                      Remove Content
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="container" style={{ paddingTop: "6%" }}>
            <div className="card-stats z-depth-5 padding-3">
              <div className="row mt-1">
                <div className="col s12 m6 l12">
                  <DatatablePage />
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
)(TeacherStudentScreen);
