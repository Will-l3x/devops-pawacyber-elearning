import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { navClick } from "../../actions/navlink";

class StudentLink extends Component {
  dashClick = (dash) => {
    this.props.navClick(dash);
  }

  render() {
    return (
      <ul className="collapsible no-shadow" data-collapsible="accordion">
        <li className="bold">
          <Link
            to="/student"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("student")}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Home</span>
          </Link>
        </li>

        <li className="bold">
          <Link
            to="/student-assignments"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick("student")}
          >
            <i className="material-icons">
              pie_chart_outlined
            </i>
            <span className="nav-text">
              My Assignments
            </span>
          </Link>
        </li>
      </ul>
    );
  }
}

StudentLink.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});


export default connect(mapStateToProps, { navClick })(StudentLink);
