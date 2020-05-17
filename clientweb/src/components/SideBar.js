import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {navClick} from "../actions/navlink";
import AdminLink from "../views/admin/AdminLink";
import HomeLink from "../views/home/HomeLink";
import StudentLink from "../views/student/StudentLink";
import TeacherLink from "../views/teacher/TeacherLink";

class SideBar extends Component {
  render() {
    let Links;

    if (this.props.link === "admin") {
      Links = AdminLink;
    }
    if (this.props.link === "teacher") {
      Links = TeacherLink;
    }
    if (this.props.link === "student") {
      Links = StudentLink;
    }
    if (this.props.link === "home") {
      Links = HomeLink;
    } 
    if (this.props.link === "") {
      this.props.navClick('home')
      Links = HomeLink;
    } 
    return (
      <ul id="slide-out" className="side-nav z-depth-2 fixed leftside-navigation" >
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
    );
  }
}
SideBar.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});

export default connect(mapStateToProps, {navClick})(SideBar);