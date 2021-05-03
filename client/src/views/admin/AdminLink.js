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
            to="/school-management"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">home</i>
            <span className="nav-text">School Management</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/subscriptions"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">subscriptions</i>
            <span className="nav-text">Subcription Plans</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/advertising"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">cast_connected</i>
            <span className="nav-text">Ads Management</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/all-subjects"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">class</i>
            <span className="nav-text">Subjects</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/content-upload"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">local_library</i>
            <span className="nav-text">Resources</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/subadmins"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">people</i>
            <span className="nav-text">Subadmins</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/all-students"
            className="waves-effect waves-cyan"
            onClick={this.onClick}
          >
            <i className="material-icons">school</i>
            <span className="nav-text">Enroled Students</span>
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
