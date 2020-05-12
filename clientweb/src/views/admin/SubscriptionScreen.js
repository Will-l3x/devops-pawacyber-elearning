import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";

export class SubscriptionScreen extends Component {
  render() {
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
          <Link
            to=""
            data-target="slide-out"
            className="sidebar-collapse waves-effect dropdown-trigger waves-block waves-light hide-on-large-only"
          >
            <i className="material-icons">format_indent_increase</i>
          </Link>
        </aside>

        <div className="section">
          <p className="caption">
            Pricing tables design is important to sell your services. For that
            reason, we have created various pricing tables design with builder
            to suit your needs.
          </p>
          <div className="divider"></div>
          <div className="row">
            <div className="col s12">
              <h4 className="header">Pricing tables style 1</h4>
            </div>

            <section className="plans-container" id="plans">
              <article className="col s12 m6 l4">
                <div className="card hoverable">
                  <div className="card-image purple waves-effect">
                    <div className="card-title">BASIC</div>
                    <div className="price">
                      <sup>$</sup>9<sub>/mo</sub>
                    </div>
                    <div className="price-desc">Free 1 month</div>
                  </div>
                  <div className="card-content">
                    <ul className="collection">
                      <li className="collection-item">500 emails</li>
                      <li className="collection-item">unlimited data</li>
                      <li className="collection-item">1 users</li>
                      <li className="collection-item">first 15 day free</li>
                    </ul>
                  </div>
                  <div className="card-action center-align">
                    <button className="waves-effect waves-light  btn">
                      Select Plan
                    </button>
                  </div>
                </div>
              </article>
              <article className="col s12 m6 l4">
                <div className="card z-depth-1 hoverable">
                  <div className="card-image cyan waves-effect">
                    <div className="card-title">PROFESSIONAL</div>
                    <div className="price">
                      <sup>$</sup>29<sub>/mo</sub>
                    </div>
                    <div className="price-desc">Most Popular</div>
                  </div>
                  <div className="card-content">
                    <ul className="collection">
                      <li className="collection-item">2000 emails</li>
                      <li className="collection-item">unlimited data</li>
                      <li className="collection-item">10 users</li>
                      <li className="collection-item">first 30 day free</li>
                    </ul>
                  </div>
                  <div className="card-action center-align">
                    <button className="waves-effect waves-light  btn">
                      Select Plan
                    </button>
                  </div>
                </div>
              </article>
              <article className="col s12 m6 l4">
                <div className="card hoverable">
                  <div className="card-image green waves-effect">
                    <div className="card-title">PREMIUM</div>
                    <div className="price">
                      <sup>$</sup>49<sub>/mo</sub>
                    </div>
                    <div className="price-desc">Get 20% off</div>
                  </div>
                  <div className="card-content">
                    <ul className="collection">
                      <li className="collection-item">10,000 emails</li>
                      <li className="collection-item">unlimited data</li>
                      <li className="collection-item">unlimited users</li>
                      <li className="collection-item">first 90 day free</li>
                    </ul>
                  </div>
                  <div className="card-action center-align">
                    <button className="waves-effect waves-light  btn">
                      Select Plan
                    </button>
                  </div>
                </div>
              </article>
            </section>

            <div className="col s12">
              <br></br>
              <br></br>
              <div className="divider"></div>
              <h4 className="header">Pricing tables style 2</h4>
            </div>

            <section className="plans-container" id="plans">
              <article className="col s12 m6 l4">
                <div className="card z-depth-1">
                  <div className="card-image light-blue waves-effect">
                    <div className="card-title">BASIC</div>
                    <div className="price">
                      <sup>$</sup>9<sub>/mo</sub>
                    </div>
                    <div className="price-desc">Free 1 month</div>
                  </div>
                  <div className="card-content">
                    <ul className="collection">
                      <li className="collection-item">500 emails</li>
                      <li className="collection-item">unlimited data</li>
                      <li className="collection-item">1 users</li>
                      <li className="collection-item">first 15 day free</li>
                    </ul>
                  </div>
                  <div className="card-action center-align">
                    <button className="waves-effect waves-light light-blue btn">
                      Select Plan
                    </button>
                  </div>
                </div>
              </article>

              <article className="col s12 m6 l4 ">
                <div className="card z-depth-2">
                  <div className="card-image light-blue darken-1 waves-effect">
                    <div className="card-title">PROFESSIONAL</div>
                    <div className="price">
                      <sup>$</sup>29<sub>/mo</sub>
                    </div>
                    <div className="price-desc">Most Popular</div>
                  </div>
                  <div className="card-content">
                    <ul className="collection">
                      <li className="collection-item">2000 emails</li>
                      <li className="collection-item">unlimited data</li>
                      <li className="collection-item">10 users</li>
                      <li className="collection-item">first 30 day free</li>
                    </ul>
                  </div>
                  <div className="card-action center-align">
                    <button className="waves-effect waves-light light-blue btn">
                      Select Plan
                    </button>
                  </div>
                </div>
              </article>

              <article className="col s12 m6 l4">
                <div className="card z-depth-3">
                  <div className="card-image light-blue darken-2 waves-effect">
                    <div className="card-title">PREMIUM</div>
                    <div className="price">
                      <sup>$</sup>49<sub>/mo</sub>
                    </div>
                    <div className="price-desc">Get 20% off</div>
                  </div>
                  <div className="card-content">
                    <ul className="collection">
                      <li className="collection-item">10,000 emails</li>
                      <li className="collection-item">unlimited data</li>
                      <li className="collection-item">unlimited users</li>
                      <li className="collection-item">first 90 day free</li>
                    </ul>
                  </div>
                  <div className="card-action center-align">
                    <button className="waves-effect waves-light light-blue btn">
                      Select Plan
                    </button>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);
