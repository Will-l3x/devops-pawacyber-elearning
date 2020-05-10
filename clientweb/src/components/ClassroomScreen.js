import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { Redirect } from "react-router";

export class ClassroomScreen extends Component {
  state = {
    redirect: false,
    to: "",
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="classroom-students" />;
    }
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
          <Link
            to=""
            data-target="slide-out"
            className="sidebar-collapse dropdown-triger waves-effect waves-block waves-light hide-on-large-only"
          >
            <i className="material-icons">format_indent_increase</i>
          </Link>
        </aside>

        <section id="content">
          <div style={{ position: "relative", zIndex: 50 }}>
            <nav style={{ position: "fixed" }}>
              <div className="nav-wrapper grey lighten-3 row">
                <div className="col s4 offset-s4">
                  <div className="col s6">
                    <div className="btn-classroom left black-text bold">
                      Classwork
                    </div>

                    <div
                      onClick={() => {
                        this.setState({
                          redirect: true,
                        });
                      }}
                      className="btn-classroom left black-text bold"
                    >
                      Students
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="container">
            <div className="row" style={{ paddingTop: 85, width: "80%" }}>
              <div className="col s12">
                <ul id="task-card" className="collection">
                  <li className="collection-item">
                    <label>
                      Assignment 1
                      <Link to="" className="secondary-content">
                        <span className="ultra-small">Due Today</span>
                      </Link>
                    </label>
                    <span className="task-cat cyan">Assignment</span>
                  </li>
                  <li className="collection-item">
                    <label>
                      Exercise 1
                      <Link to="" className="secondary-content">
                        <span className="ultra-small">Due May 3</span>
                      </Link>
                    </label>
                    <span className="task-cat red accent-2">Test/Exercise</span>
                  </li>
                  <li className="collection-item">
                    <label>
                      Course Material 2
                      <Link to="" className="secondary-content">
                        <span className="ultra-small">Posted Apr 30</span>
                      </Link>
                    </label>
                    <span className="task-cat teal accent-4">
                      Additional Material
                    </span>
                  </li>
                  <li className="collection-item">
                    <label>
                      Course Material 1
                      <Link to="" className="secondary-content">
                        <span className="ultra-small">Posted Apr 18</span>
                      </Link>
                    </label>
                    <span className="task-cat teal accent-4">
                      Additional Material
                    </span>
                  </li>
                </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
