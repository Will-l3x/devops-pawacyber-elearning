import React, { Component } from "react";
import { Link } from "react-router-dom";

class OuterHeader extends Component {
  render() {
    return (
        <nav className="nav-wrapper gradient-45deg-light-blue-cyan head-pawa">
        <Link className="brand-logo" rel="noopener noreferrer"  to="#welcome">PawaCyber</Link>
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
                  to="#pricing"
                >
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link page-scroll"
                  rel="noopener noreferrer"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
        </nav>
    );
  }
}

export default OuterHeader;
