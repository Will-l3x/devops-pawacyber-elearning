import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import { Link } from "react-router-dom";
import { Calendar } from "../../components/calendar";
import M from "materialize-css";

export class AdminTodoScreen extends Component {
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

        <div className="section" style={{ paddingBottom: 0 }}>
          <div style={{ position: "relative", zIndex: 50 }}>
            <nav
              className="navbar nav-extended"
              style={{
                position: "fixed",
                maxWidth: "85%",
                minHeight: 70,
                transform: "translateY(-100%)",
              }}
            >
              <div className="nav-content">
                <Link
                  style={{ marginTop: "3%", marginBottom: "1%" }}
                  to="#"
                  className="brand-logo"
                >
                  Admin Calendar
                </Link>
              </div>
            </nav>
          </div>

          <section id="content" style={{ paddingTop: "1%" }}>
            <div className="container">
              <div className="row">
                <div className="col m10 offset-m1" style={{ paddingTop: 15 }}>
                  <div className="card padding-1">
                    <Calendar />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminTodoScreen);
