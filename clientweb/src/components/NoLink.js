import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { navClick } from "../actions/navlink";

class NoLink extends Component {
  dashClick = () => {
    this.props.navClick("");
  }

  render() {
    return <div/>;
  }
}

NoLink.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
});


export default connect(mapStateToProps, { navClick })(NoLink);
