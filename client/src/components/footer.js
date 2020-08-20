import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer-copyright">
        <div className="container center-align">
          <span>
            Copyright © {new Date().getFullYear()} Pawa Cyber.
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
