import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pricing extends Component {
  pricingPlan = this.props.plan;
  render() {
    return (
      <div className="card">
        {this.pricingPlan.bestOffer ? (
          <div className="label">
            <p className="best-value">Best Value</p>
          </div>
        ) : (
          ""
        )}

        <div className="card-body">
          <div className="card-title">{this.pricingPlan.title}</div>
          <div className="card-subtitle">{this.pricingPlan.description}</div>
          <hr className="cell-divide-hr" />
          <div className="price">
            <span className="currency">$</span>
            <span className="value">{this.pricingPlan.price}</span>
            <div className="frequency">{this.pricingPlan.frequency}</div>
          </div>
          <hr className="cell-divide-hr" />
          <ul className="list-unstyled li-space-lg">
            {this.pricingPlan.features.map((feature, i) => (
              <li key={i} className="media">
                <i className="fas fa-check" style={{ paddingRight: "5px" }}></i>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            className="btn-solid-reg page-scroll"
            rel="noopener noreferrer"
            to="#"
          >
            ENQUIRE
          </Link>
        </div>
      </div>
    );
  }
}

export default Pricing;
