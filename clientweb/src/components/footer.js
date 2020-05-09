import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer-copyright">
        <div className="container">
          <span>
            Copyright © {new Date().getFullYear()} Classroom All rights reserved.
          </span>
          <span className="right hide-on-small-only">
            {" "}
            Design and Developed by The Boys
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
