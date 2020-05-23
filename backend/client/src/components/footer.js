import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer-copyright">
        <div className="container">
          <span>
            Copyright © {new Date().getFullYear()} PawaCyber.
          </span>
          <span className="right hide-on-small-only">
            Design and Developed by Shingirirai Bishi and Kelvin Chelenje
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
