import React, { Component } from "react";
import { Link } from "react-router-dom";
class Header extends Component {
  
  render() {
    return (
      <div className="header">
        <div className="">
          <div className="">
            <Link className="" to="/Home">
              <span className="">
                <i className="material-icons" style={{ fontSize: 24 }}>
                  home
                </i>                  home
              </span>
            </Link>

            <Link className="" to="/about">
              <span className="">
                <i className="material-icons " style={{ fontSize: 24 }}>
                  home
                </i>                  about
              </span>
            </Link>
            <Link className="" to="/admin">
              <span className="">
                <i className="material-icons " style={{ fontSize: 24 }}>
                  home
                </i>                  admin
              </span>
            </Link>
            <Link className="" to="/student">
              <span className="">
                <i className="material-icons " style={{ fontSize: 24 }}>
                  home
                </i>                  student
              </span>
            </Link>
            <Link className="" to="/teacher">
              <span className="">
                <i className="material-icons " style={{ fontSize: 24 }}>
                  home
                </i>                  teacher
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
