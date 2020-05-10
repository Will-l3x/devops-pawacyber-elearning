import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { navClick } from "../../actions/navlink";

class HomeLink extends Component {
  dashClick = (dash) => {
    this.props.navClick(dash);
  }

  render() {
    return (
      <ul className="collapsible no-shadow" data-collapsible="accordion">
        <li className="bold">
          <Link
            to="/"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick('home')}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">This is not home</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/admin"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick('admin')}
          >
            <i className="material-icons">
              pie_chart_outlined
            </i>
            <span className="nav-text">
              Admin
            </span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/teacher"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick('teacher')}
          >
            <i className="material-icons">
              pie_chart_outlined
            </i>
            <span className="nav-text">
             Teacher
            </span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/student"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick('student')}
          >
            <i className="material-icons">
              pie_chart_outlined
            </i>
            <span className="nav-text">
              Student
            </span>
          </Link>
        </li>
      </ul>
    );
  }
}

HomeLink.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});


export default connect(mapStateToProps, { navClick })(HomeLink);
