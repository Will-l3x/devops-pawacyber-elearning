import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { navClick } from "../../actions/navlink";

class AdminLink extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.navClick('admin');
  }

  render() {
    return (
      <ul className="collapsible no-shadow" data-collapsible="accordion">
        <li className="bold">
          <Link
            to="/admin"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">dashboard</i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/courses"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="fa fa-book"></i>
            <span className="nav-text">Courses</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/admin-teacher-management"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">people</i>
            <span className="nav-text">Teachers</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/subscriptions"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">subscriptions</i>
            <span className="nav-text">Subscriptions</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/admin-calendar"
            className="dash-link waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">date_range</i>
            <span className="nav-text">Calender</span>
          </Link>
        </li>
      </ul>
    );
  }
}

AdminLink.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link
});


export default connect(mapStateToProps, { navClick })(AdminLink);
