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
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/teacher"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Teacher</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/teacher"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Create Course Outline</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/teacher"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("teacher")}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">My Classes</span>
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
