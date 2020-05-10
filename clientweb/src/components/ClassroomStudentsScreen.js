import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import SideBar from "./SideBar";

export class ClassroomScreen extends Component {
  state = {
    redirect: false,
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to='classroom' />;
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
                    <div
                      onClick={() => {
                        this.setState({
                          redirect: true
                        });
                      }}
                      className="btn-classroom left black-text bold"
                    >
                      Classwork
                    </div>

                    <div
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
                <ul id="task-card" className="collection flow-text">
                  <li className="collection-item">
                    <label>
                      J.C
                      <Link to="#" className="secondary-content">
                        <span className="ultra-small">H169324Y</span>
                      </Link>
                    </label>
                  </li>
                  <li className="collection-item">
                    <label>
                      Nu J Twork
                      <Link to="#" className="secondary-content">
                        <span className="ultra-small">H1644323G</span>
                      </Link>
                    </label>
                  </li>
                  <li className="collection-item">
                    <label>
                      Will Zhira
                      <Link to="#" className="secondary-content">
                        <span className="ultra-small">H164321G</span>
                      </Link>
                    </label>
                  </li>
                  <li className="collection-item">
                    <label>
                      Tate Mbuwa{" "}
                      <Link to="#" className="secondary-content">
                        <span className="ultra-small">H169434Y</span>
                      </Link>
                    </label>
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
