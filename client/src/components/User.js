import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../assets/css/user.css";
import Avatar from "@material-ui/core/Avatar";
import dp from "../assets/images/avatar/avatar-11.png";
import moment from "moment";

class User extends Component {
  static defaultProps = {
    name: "John Doe",
    //email: "JohnDoe@example.com",
    pic: dp,
  };

  static propTypes = {
    name: PropTypes.string,
    //email: PropTypes.string,
    pic: PropTypes.string,
  };
  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-red-pink",
      "gradient-45deg-green-teal",
      "gradient-45deg-amber-amber",
      "gradient-45deg-purple-deep-purple",
      "gradient-45deg-brown-brown",
    ];
    return colors[i % 6];
  };
  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  render() {
    const {
      name,
      firstname,
      lastname,
      gradeid,
      //pic,
      dob,
      datejoined,
      enrolmentkey,
      rolename,
      email,
      index,
    } = this.props;

    return (
      <div className="col s12 m6 l4">
        <div className="card border-radius-10 z-depth-5">
          <div className="user-content card-content">
            <div className="row">
              <div className="col s4">
                <Avatar className={`avatar-large-2 ${this.colors(index)}`}>
                  {firstname.charAt(0)}
                  {lastname.charAt(0)}
                </Avatar>
              </div>
              <div className="col s8">
                <div id="full-name" className="text-capitalize">
                  {this.truncate(name, 24)}
                </div>
                <div id="user-name">{rolename}</div>
                <div className="description">
                  <p>
                    <i className="material-icons small icon-translate">
                      airplanemode_active
                    </i>{" "}
                    Joined{" "}
                    {moment(new Date(datejoined)).format("LL") ===
                    "Invalid date"
                      ? "Unknown"
                      : moment(new Date(datejoined)).format("LL")}
                  </p>

                  <p>
                    <i className="material-icons small icon-translate">email</i>{" "}
                    Contacts: <span>{email}</span>
                  </p>
                  <br />
                </div>
              </div>
              <div className="col s12 user-footer">
                <button id="btn" className="activator info-button">
                  More Info!
                </button>
              </div>
            </div>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4 text-capitalize">
              {name}
              <i className="material-icons right">close</i>
            </span>
            <p>Here is some more information about this user.</p>
            <p>
              <i className="material-icons small icon-translate">cake</i>{" "}
              {moment(new Date(dob)).format("LL") === "Invalid date"
                ? "Unknown"
                : moment(new Date(dob)).format("LL")}
            </p>
            <p>
              <i className="material-icons small icon-translate">
                airplanemode_active
              </i>{" "}
              Joined {moment(new Date(datejoined)).format("LL")}
            </p>
            <p>
              <i className="material-icons small icon-translate">class</i>{" "}
              Grade: {gradeid}
            </p>
            <p>
              <i className="material-icons small icon-translate">vpn_key</i>{" "}
              EnrolmentKey: {enrolmentkey}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
