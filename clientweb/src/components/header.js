import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/materialize-logo.png";
import avatar from "../assets/images/avatar/avatar-7.png";
class Header extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="navbar-color gradient-45deg-light-blue-cyan">
          <div className="nav-wrapper">
            <ul className="left">
              <li>
                <h1 className="logo-wrapper">
                  <Link to="/" className="brand-logo darken-1">
                    <img src={logo} alt="materialize logo"></img>
                    <span className="logo-text hide-on-med-and-down">
                      Classroom
                    </span>
                  </Link>
                </h1>
              </li>
            </ul>
            <div className="header-search-wrapper hide-on-med-and-down">
              <i className="material-icons">search</i>
              <input
                type="text"
                name="Search"
                className="header-search-input z-depth-2"
                placeholder="Explore Classroom"
              ></input>
            </div>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link
                  to=""
                  className="waves-effect waves-block waves-light toggle-fullscreen"
                >
                  <i className="material-icons">settings_overscan</i>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="waves-effect waves-block waves-light dropdown-trigger notification-button"
                  data-target="notifications-dropdown"
                >
                  <i className="material-icons">
                    notifications_none
                    <small className="notification-badge pink accent-2">
                      5
                    </small>
                  </i>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="waves-effect waves-block dropdown-trigger waves-light profile-button"
                  data-target="profile-dropdown"
                >
                  <span className="avatar-status avatar-online">
                    <img src={avatar} alt="avatar"></img>
                    <i></i>
                  </span>
                </Link>
              </li>
            </ul>
              <ul id="notifications-dropdown" className="dropdown-content dropdown-notify">
                <li>
                  <h6>
                    NOTIFICATIONS
                    <span className="new badge">5</span>
                  </h6>
                </li>
                <li className="divider"></li>
                <li>
                  <Link to="" className="grey-text text-darken-2">
                    <span className="material-icons icon-bg-circle cyan small">
                      add_shopping_cart
                    </span>{" "}
                    A new order has been placed!
                  </Link>
                  <time
                    className="media-meta"
                    dateTime="2015-06-12T20:50:48+08:00"
                  >
                    2 hours ago
                  </time>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-2">
                    <span className="material-icons icon-bg-circle red small">
                      stars
                    </span>{" "}
                    Completed the task
                  </Link>
                  <time
                    className="media-meta"
                    dateTime="2015-06-12T20:50:48+08:00"
                  >
                    3 days ago
                  </time>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-2">
                    <span className="material-icons icon-bg-circle teal small">
                      settings
                    </span>{" "}
                    Settings updated
                  </Link>
                  <time
                    className="media-meta"
                    dateTime="2015-06-12T20:50:48+08:00"
                  >
                    4 days ago
                  </time>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-2">
                    <span className="material-icons icon-bg-circle deep-orange small">
                      today
                    </span>{" "}
                    Director meeting started
                  </Link>
                  <time
                    className="media-meta"
                    dateTime="2015-06-12T20:50:48+08:00"
                  >
                    6 days ago
                  </time>
                </li>
                <li>
                  <Link to="" className="grey-text text-darken-2">
                    <span className="material-icons icon-bg-circle amber small">
                      trending_up
                    </span>{" "}
                    Generate monthly report
                  </Link>
                  <time
                    className="media-meta"
                    dateTime="2015-06-12T20:50:48+08:00"
                  >
                    1 week ago
                  </time>
                </li>
              </ul>
              <ul id="profile-dropdown" className="dropdown-content dropdown-acc">
                <li>
                  <Link to="#" className="grey-text text-darken-1">
                    <i className="material-icons">face</i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="#" className="grey-text text-darken-1">
                    <i className="material-icons">settings</i> Settings
                  </Link>
                </li>
                <li>
                  <Link to="#" className="grey-text text-darken-1">
                    <i className="material-icons">live_help</i> Help
                  </Link>
                </li>
                <li className="divider"></li>
                <li>
                  <Link to="#" className="grey-text text-darken-1">
                    <i className="material-icons">lock_outline</i> Lock
                  </Link>
                </li>
                <li>
                  <Link to="#" className="grey-text text-darken-1">
                    <i className="material-icons">keyboard_tab</i> Logout
                  </Link>
                </li>
              </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
