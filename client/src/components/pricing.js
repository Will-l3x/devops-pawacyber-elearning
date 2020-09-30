import React, { Component } from "react";
//import { Link } from "react-router-dom";

class Pricing extends Component {
  pricingPlan = this.props.plan;
  render() {
    return (
      <div className="col s12 m4">
        <div className="card z-depth-4">
          {/* {this.pricingPlan.bestOffer ? (
          <div className="label">
            <p className="best-value">Best Value</p>
          </div>
        ) : (
          ""
        )} */}

          <div className="card-body min-height-370">
            <div className="card-title" style={{ fontSize: "16px" }}>
              {this.pricingPlan.subscriptionname}
            </div>
            <div className="card-subtitle">
              {this.pricingPlan.description}
            </div>
            <hr className="cell-divide-hr" />
            <div className="price">
              <span className="currency" style={{ fontSize: "17px" }}>
                N$
              </span>
              <span className="value">{this.pricingPlan.price}</span>
              {/* <div className="frequency">{this.pricingPlan.frequency}</div> */}
            </div>
            <hr className="cell-divide-hr" />
            <ul className="list-unstyled li-space-lg">
              <li className="media">
                <i className="fas fa-check" style={{ paddingRight: "5px" }}></i>
                Starting Grade: {this.pricingPlan.mingrade}
              </li>
              <li className="media">
                <i className="fas fa-check" style={{ paddingRight: "5px" }}></i>
                Ending Grade: {this.pricingPlan.maxgrade}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
