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
    console.log('clicked');
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
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/add-course"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Add Course</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/courses"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Course List</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/add-teacher"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Add Teacher</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/subscriptions"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">pie_chart_outlined</i>
            <span className="nav-text">Manage Subscriptions</span>
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

const mapStateToProps = (state) => {
  const link = state.dashLink.link;
  return { link };
};

export default connect(mapStateToProps, { navClick })(AdminLink);
