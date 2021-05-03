import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { navClick } from "../actions/navlink";
import AdminLink from "../views/admin/AdminLink";
import SchoolLink from "../views/school/SchoolLink";
import StudentLink from "../views/student/StudentLink";
import TeacherLink from "../views/teacher/TeacherLink";
import {Redirect } from "react-router-dom";
import $ from "jquery";
import M from "materialize-css";

class LeftSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidenav_trigger: "",
      logout: false,
      user: {
        role: "admin",
      },
    };
  }
  componentDidMount() {
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
  }
  handleLogout = () => {
    this.setState({ logout: true });
    localStorage.setItem("user", JSON.stringify({ username: "" }));
  };
  render() {
    //should just use user role to change links
    let Links;
    const user = JSON.parse(localStorage.getItem("user"));
 
    if (user.roleid === 5) {
      Links = AdminLink;
    } else if (user.roleid === 4) {
      Links = SchoolLink;
    } else if (user.roleid === 1) {
      Links = TeacherLink;
    } else if (user.roleid === 3) {
      Links = StudentLink;
    } else {
      return <Redirect to="/login" />;
    }

    if (this.state.logout) {
      return <Redirect to="/login" />;
    }

    return (
      <aside id="left-sidebar-nav">
        <ul
          id="slide-out"
          className={`side-nav toggle-ls-bar z-depth-2 fixed leftside-navigation`}
        >
          <li className="no-padding">
            <Links />
          </li>{" "}
        </ul>
        {/* <div className="no-padding user-profile display-none">
          <hr className="hr3 no-margin"></hr>
          <div className="justify-center" style={{ height: 70, width: "100%" }}>
            <a href="/profile" className="grey-text text-darken-1">
              <i
                className="material-icons"
                style={{ transform: "translate(30px, -10px)" }}
              >
                face
              </i>{" "}
              Profile
            </a>
            <a
              href="#!"
              onClick={this.handleLogout}
              className="grey-text text-darken-1"
            >
              <i
                className="material-icons"
                style={{ transform: "translate(30px, -10px)" }}
              >
                keyboard_tab
              </i>{" "}
              Logout
            </a>
          </div>
        </div> */}
      </aside>
    );
  }
}
LeftSidebar.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
  location: state.dashLink.location,
});

export default connect(mapStateToProps, { navClick })(LeftSidebar);
