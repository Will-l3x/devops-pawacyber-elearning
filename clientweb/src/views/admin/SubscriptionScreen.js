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
            <SideBar/>
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                   
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
                          Starter
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Medium
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Complete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <section id="content" style={{ marginBottom: 0 }}>
                <div className="container" style={{ paddingTop: "7%" }}>
                  <div id="pricing" className="cards-2 sect-learn">
                    <div className="container">
                      <div className="row">
                        <div className="col s12">
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title">STARTER</div>
                              <div className="card-subtitle">
                                Just to see what can be achieved
                              </div>
                              <hr className="cell-divide-hr" />
                              <div className="price">
                                <span className="currency">$</span>
                                <span className="value">199</span>
                                <div className="frequency">monthly</div>
                              </div>
                              <hr className="cell-divide-hr" />
                              <ul className="list-unstyled li-space-lg">
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                              </ul>
                              <div className="button-wrapper">
                                <Link
                                  className="btn-solid-reg page-scroll"
                                  rel="noopener noreferrer"
                                  to="#request"
                                >
                                  REQUEST
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-body">
                              <div className="card-title">MEDIUM</div>
                              <div className="card-subtitle">
                                Very appropriate for the short term
                              </div>
                              <hr className="cell-divide-hr" />
                              <div className="price">
                                <span className="currency">$</span>
                                <span className="value">299</span>
                                <div className="frequency">monthly</div>
                              </div>
                              <hr className="cell-divide-hr" />
                              <ul className="list-unstyled li-space-lg">
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                              </ul>
                              <div className="button-wrapper">
                                <Link
                                  className="btn-solid-reg page-scroll"
                                  rel="noopener noreferrer"
                                  to="#request"
                                >
                                  REQUEST
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="label">
                              <p className="best-value">Best Value</p>
                            </div>
                            <div className="card-body">
                              <div className="card-title">COMPLETE</div>
                              <div className="card-subtitle">
                                Must have for large companies
                              </div>
                              <hr className="cell-divide-hr" />
                              <div className="price">
                                <span className="currency">$</span>
                                <span className="value">399</span>
                                <div className="frequency">monthly</div>
                              </div>
                              <hr className="cell-divide-hr" />
                              <ul className="list-unstyled li-space-lg">
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                                <li className="media">
                                  <i
                                    className="fas fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Dummy Feature 3a
                                </li>
                              </ul>
                              <div className="button-wrapper">
                                <Link
                                  className="btn-solid-reg page-scroll"
                                  rel="noopener noreferrer"
                                  to="#request"
                                >
                                  REQUEST
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
