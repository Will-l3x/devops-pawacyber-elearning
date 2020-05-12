import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";

export class AddTeacherScreen extends Component {
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
          <div className="container">
            <nav className="navbar nav-extended">
              <div className="nav-content">
                <Link to="#" className="brand-logo">
                  Dashboard
                </Link>
                <ul id="nav-mobile" className="right">
                  <li>
                    <Link
                      to="#!"
                      data-target="chat-dropdown"
                      className="waves-effect"
                    >
                      <i className="material-icons">settings</i>
                    </Link>
                  </li>
                </ul>

                <ul className="tabs">
                  <li className="tab">
                    <Link to="#test1">Metrics</Link>
                  </li>
                  <li className="tab">
                    <Link to="#test2" className="active">
                      Employees
                    </Link>
                  </li>
                  <li className="tab">
                    <Link to="#test3">Calendar</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacherScreen);
