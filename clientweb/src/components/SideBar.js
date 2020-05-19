import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { navClick } from "../actions/navlink";
import HomeLink from "../views/home/HomeLink";
import AdminLink from "../views/admin/AdminLink";
import StudentLink from "../views/student/StudentLink";
import TeacherLink from "../views/teacher/TeacherLink";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import $ from "jquery";
import M from "materialize-css";

class SideBar extends Component {
  componentDidMount(){
    M.AutoInit();
    const elem = $(".tooltipped");
    M.Tooltip.init(elem, {
      delay: 50,
    });
    const elem2 = $(".sidebar-collapse");
    M.Sidenav.init(elem2, {
      edge: "left",
    });
    const elem3 = $(".menu-sidebar-collapse");
    M.Sidenav.init(elem3, {
      menuWidth: 240,
      edge: "left", // Choose the horizontal origin
      //closeOnClick:true, // Set if default menu open is true
      menuOut: false, // Set if default menu open is true
    });
    const elem4 = $(".chat-collapse");
    M.Sidenav.init(elem4, {
      menuWidth: 300,
      edge: "right",
    });
  }
  render() {
    let Links;
    console.log(this.props)
    if (this.props.link === "admin") {
      Links = AdminLink;
    }
    if (this.props.link === "teacher") {
      Links = TeacherLink;
    }
    if (this.props.link === "student") {
      Links = StudentLink;
    }
    if (this.props.link === "") {
      if (this.props.data) {
        if (this.props.data.location.pathname === "/teacher") {
          Links = TeacherLink;
        }
        if (this.props.data.location.pathname === "/student") {
          Links = StudentLink;
        }
        if (this.props.data.location.pathname === "/admin") {
          Links = AdminLink;
        }
      } else {
        Links = HomeLink;
        return <Redirect to="/login" />;
      }
    }

    return (
      <aside id="left-sidebar-nav">
        {" "}
        <ul
          id="slide-out"
          className="side-nav z-depth-2 fixed leftside-navigation"
        >
          {/* <li className="user-details cyan darken-2">
          <div className="row">
            <div className="col col s8 m8 l8">
              <ul id="profile-dropdown-nav" className="dropdown-content">
                <li>
                  <Link to="" className="grey-text text-darken-1">
                    <i className="material-icons">face</i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-1">
                    <i className="material-icons">live_help</i> Help
                  </Link>
                </li>
                <li className="divider"></li>
                <li>
                  <Link to="" className="grey-text text-darken-1">
                    <i className="material-icons">keyboard_tab</i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li> */}
          <li className="no-padding">
            <Links></Links>
          </li>
        </ul>
        <Link
          to="#"
          data-target="slide-out"
          className="sidebar-collapse sidenav-trigger white-text waves-effect waves-light hide-on-large-only"
        >
          <i className="material-icons">format_indent_increase</i>
        </Link>
      </aside>
    );
  }
}
SideBar.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
  location: state.dashLink.location,
});

export default connect(mapStateToProps, { navClick })(SideBar);
