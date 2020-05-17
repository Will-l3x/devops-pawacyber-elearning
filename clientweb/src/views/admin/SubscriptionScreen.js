import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import M from "materialize-css";
import Footer from "../../components/footer";
import Header from "../../components/header";

export class SubscriptionScreen extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
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

            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                    maxWidth: "85%",
                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "4%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Subscription Management
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      data-target="dropdown1"
                      style={{ marginTop: "3%", marginRight: "2%" }}
                    >
                      <i className="material-icons">settings</i>
                    </Link>
                    <ul
                      id="dropdown1"
                      className="dropdown-content"
                      style={{
                        minWidth: "200px",
                        whiteSpace: "nowrap",
                        opacity: 1,
                        display: "none",
                      }}
                    >
                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Basic
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Professional
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Premium
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <section id="content" style={{ paddingTop: "2%" }}>
                <div className="container">
                  <div className="row">
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
                              <li className="collection-item">
                                unlimited data
                              </li>
                              <li className="collection-item">1 users</li>
                              <li className="collection-item">
                                first 15 day free
                              </li>
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
                              <li className="collection-item">
                                unlimited data
                              </li>
                              <li className="collection-item">10 users</li>
                              <li className="collection-item">
                                first 30 day free
                              </li>
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
                              <li className="collection-item">
                                unlimited data
                              </li>
                              <li className="collection-item">
                                unlimited users
                              </li>
                              <li className="collection-item">
                                first 90 day free
                              </li>
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
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);
