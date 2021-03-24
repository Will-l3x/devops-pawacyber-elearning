import React, { Component } from "react";
import { HashLink as Link } from "react-router-hash-link";

class OuterHeader extends Component {
  render() {
    return (
      <nav className="nav-wrapper gradient-45deg-light-blue-cyan head-pawa">
        <Link className="brand-logo" rel="noopener noreferrer" to="#welcome">
          Pawa Cyber School
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="nav-item">
            <Link
              className="nav-link page-scroll"
              rel="noopener noreferrer"
              to="/#welcome"
            >
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link page-scroll"
              rel="noopener noreferrer"
              to="/#services"
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link page-scroll"
              rel="noopener noreferrer"
              to="/#pricing"
            >
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <div
              className="sign-in justify-center z-depth-5"
            >
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <div
              className="sign-in justify-center z-depth-5"
            >
              <Link className="nav-link" to="/register-new-account/no-referrer">
                Register
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default OuterHeader;
