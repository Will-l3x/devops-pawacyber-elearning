import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { navClick } from "../../actions/navlink";

class SchoolLink extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.navClick("school");
  }

  render() {
    return (
      <ul className="collapsible no-shadow" data-collapsible="accordion">
        <li className="bold">
          <Link
            to="/school"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">dashboard</i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/school-classes"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">class</i>
            <span className="nav-text">Classes</span>
          </Link>
        </li>

        <li className="bold">
          <Link
            to="/school-teacher-management"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">people</i>
            <span className="nav-text">Teachers</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/school-student-management"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">people</i>
            <span className="nav-text">Student</span>
          </Link>
        </li>
        {/* <li className="bold">
          <Link
            to="/school-calendar"
            className="dash-link waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">date_range</i>
            <span className="nav-text">Calender</span>
          </Link>
        </li> */}
      </ul>
    );
  }
}

SchoolLink.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});

export default connect(mapStateToProps, { navClick })(SchoolLink);
