import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { navClick } from "../../actions/navlink";

class TeacherLink extends Component {
  dashClick = (dash) => {
    this.props.navClick(dash);
  };

  render() {
    return (
      <ul className="collapsible no-shadow" data-collapsible="accordion">
        <li className="bold">
          <Link
            to="/teacher"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">dashboard</i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/classroom-mark"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">visibility</i>
            <span className="nav-text">Classroom</span>
          </Link>
        </li>

        <li className="bold">
          <Link
            to="/upload"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">backup</i>
            <span className="nav-text">Upload Resources</span>
          </Link>
        </li>

        <li className="bold">
          <Link
            to="/assignments"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">backup</i>
            <span className="nav-text">Upload New Assignment</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/video-player"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("student")}
          >
            <i className="material-icons">live_tv</i>
            <span className="nav-text">Video Class</span>
          </Link>
        </li>

        <li className="bold">
          <Link
            to="/teacher-calendar"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">date_range</i>
            <span className="nav-text">Calender</span>
          </Link>
        </li>
      </ul>
    );
  }
}

TeacherLink.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});

export default connect(mapStateToProps, { navClick /*, action*/ })(TeacherLink);
