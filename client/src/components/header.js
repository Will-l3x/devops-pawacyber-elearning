import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import avatar from "../assets/images/avatar/avatar-7.png";
import $ from "jquery";
class Header extends Component {
  constructor() {
    super();
    this.state = {
      logout: false,
      sidenav_trigger: true,
    };
    this.toggleFullScreen.bind(this);
    this.handleLogout.bind(this);
  }
  toggleFullScreen = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };
  handleLogout = () => {
    this.setState({ logout: true });
    localStorage.setItem("user", JSON.stringify({ username: "" }));
  };

  toggleSidenav() {
    const thiss = this;
    function triggerOn() {
      $(".toggle-ls-bar").removeClass("sidenav-translate");
      thiss.setState({ sidenav_trigger: true });
    }
    function triggerOff() {
      $(".toggle-ls-bar").addClass("sidenav-translate");
      thiss.setState({ sidenav_trigger: false });
    }
    this.state.sidenav_trigger ? triggerOff() : triggerOn();
  }
  render() {
    if (this.state.logout) {
      console.log("logged out");
      return <Redirect to="/login" />;
    }
    return (
      <div className="navbar-fixed">
        <nav className="navbar-color width-75% gradient-45deg-light-blue-cyan">
          <div className="nav-wrapper">
            <ul className="left">
              <li>
                <h1 className="logo-wrapper">
                  <Link
                    to="#!"
                    data-target="slide-out"
                    onClick={this.toggleSidenav.bind(this)}
                    className="white-text waves-effect sidenav-trigger-2 waves-light hide-on-large-only"
                  >
                    <i className="material-icons">format_indent_increase</i>
                  </Link>
                  <Link to="#" className="brand-logo">
                    <span className="logo-text hide-on-med-and-down">
                      Pawa Cyber eLearning
                    </span>
                  </Link>
                </h1>
              </li>
            </ul>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link
                  onClick={this.toggleFullScreen}
                  to="#"
                  className="waves-effect waves-block waves-light toggle-fullscreen"
                >
                  <i className="material-icons">settings_overscan</i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="waves-effect waves-block waves-light dropdown-trigger notification-button"
                  data-target="notifications-dropdown"
                >
                  <i className="material-icons">
                    notifications_none
                    <small className="notification-badge pink accent-2">
                      0
                    </small>
                  </i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
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
            <ul
              id="notifications-dropdown"
              className="dropdown-content dropdown-notify"
            >
              <li>
                <h6>
                  NOTIFICATIONS
                  <span className="new badge">0</span>
                </h6>
              </li>
              <li className="divider"></li>
              {/* <li>
                <Link to="#" className="grey-text text-darken-2">
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
              </li> */}
            </ul>

            <ul id="profile-dropdown" className="dropdown-content dropdown-acc">
              <li>
                <Link to="/profile" className="grey-text text-darken-1">
                  <i className="material-icons">face</i> Profile
                </Link>
              </li>
              {/* <li>
                <Link to="#" className="grey-text text-darken-1">
                  <i className="material-icons">live_help</i> Help
                </Link>
              </li> */}
              <li className="divider"></li>
              <li>
                <Link
                  to="#"
                  onClick={this.handleLogout}
                  className="grey-text text-darken-1"
                >
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
