import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AdminLink from "../views/admin/AdminLink";
import HomeLink from "../views/home/HomeLink";

class SideBar extends Component {
  render() {
    let Links;

    if (this.props.link === "admin") {
      Links = AdminLink;
    } else if (this.props.link === "home") {
      Links = HomeLink;
    } else {
      Links = HomeLink;
    }
    return (
      <ul
        id="slide-out"
        className="side-nav z-depth-5 fixed leftside-navigation"
      >
        <li className="user-details cyan darken-2">
          <div className="row">
            <div className="col col s4 m4 l4">
              <img
                src="images/avatar/avatar-7.png"
                alt=""
                className="circle responsive-img valign profile-image cyan"
              ></img>
            </div>
            <div className="col col s8 m8 l8">
              <ul id="profile-dropdown-nav" className="dropdown-content">
                <li>
                  <Link to="" className="grey-text text-darken-1">
                    <i className="material-icons">face</i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-1">
                    <i className="material-icons">settings</i> Settings
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
                    <i className="material-icons">lock_outline</i> Lock
                  </Link>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-1">
                    <i className="material-icons">keyboard_tab</i> Logout
                  </Link>
                </li>
              </ul>
              <Link
                className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn"
                to=""
                data-activates="profile-dropdown-nav"
              >
                John Doe
                <i className="mdi-navigation-arrow-drop-down right"></i>
              </Link>
              <p className="user-roal">Administrator</p>
            </div>
          </div>
        </li>
        <li className="no-padding">
          <Links></Links>
        </li>
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});

export default connect(mapStateToProps, null)(SideBar);
