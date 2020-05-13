import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import M from "materialize-css";

export class TeacherManagementScreen extends Component {
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

        <div id="section">
          <div style={{ position: "relative", zIndex: 50 }}>
            <nav
              className="navbar nav-extended"
              style={{
                position: "fixed",
                maxWidth: "85%"
              }}
            >
              <div className="nav-content">
                <Link style={{ marginTop: "4%" }} to="#" className="brand-logo">
                  Teacher Management
                </Link>
                <Link
                  to="#!"
                  className="dropdown-trigger waves-effect black-text right"
                  style={{ marginTop: "3%", marginRight: "2%" }}
                  data-target="dropdown7"
                >
                  <i className="material-icons">settings</i>
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
                      data-target="modal7"
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
          <section id="content" style={{ paddingTop: "2%" }}>
            <div className="container" style={{ paddingTop: "7%" }}>
              <div className="card-stats z-depth-5 padding-3">
                <div className="row mt-1">
                  <div className="col s12 m6 l12">
                    <div className="center-align flow-text">Teacher List</div>
                    <hr className="hr4"></hr>
                    <DatatablePage />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherManagementScreen);
