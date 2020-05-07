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
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li className="bold">
          <Link
            to="/admin"
            className="dash-link waves-effect waves-cyan"
            onClick={() => this.dashClick('admin')}
          >
            <i className="material-icons" data-link="admin">
              pie_chart_outlined
            </i>
            <span className="nav-text" data-link="admin">
              Admin
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

const mapStateToProps = (state) => {
  const link = state.dashLink.link;
  return { link };
};

export default connect(mapStateToProps, { navClick })(HomeLink);
