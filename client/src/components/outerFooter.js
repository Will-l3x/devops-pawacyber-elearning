import React, { Component } from "react";
import { Link } from "react-router-dom";

class OuterFooter extends Component {
  render() {
    return (
        <div className="copyright" >
        <div className="container">
          <div className="row">
            <div className="col s12">
              <p className="p-small">
                Copyright © 2020{" "}
                <Link rel="noopener noreferrer" to="#">
                  Pawa Cyber
                </Link>{" "}
                - All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OuterFooter;
