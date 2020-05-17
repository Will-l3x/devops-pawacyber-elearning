import React, { Component } from "react";

import "../../assets/css/styles.css";

import { Link } from "react-router-dom";

import headerImg from "../../assets/images/header-teamwork.svg";
import kigsImg from "../../assets/images/gids.png";
import servicesImg1 from "../../assets/images/services-icon-1.svg";
import servicesImg2 from "../../assets/images/services-icon-2.svg";
import servicesImg3 from "../../assets/images/services-icon-3.svg";
// import kigsImg from "../../assets/images/gids.png";
// import kigsImg from "../../assets/images/gids.png";
// import kigsImg from "../../assets/images/gids.png";
// import kigsImg from "../../assets/images/gids.png";
// import kigsImg from "../../assets/images/gids.png";

export class HomeScreen extends Component {
  render() {
    return (
      <div>
        <nav className="nav-wrapper gradient-45deg-light-blue-cyan navbar-custom fixed">
        <Link className="brand-logo" rel="noopener noreferrer"  to="#header">LOGO</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className="nav-item">
                <Link
                  className="nav-link page-scroll"
                  rel="noopener noreferrer"
                  to="#header"
                >
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link page-scroll"
                  rel="noopener noreferrer"
                  to="#services"
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
                  to="#contact"
                >
                  About
                </Link>
              </li>
            </ul>
        </nav>

        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col s6">
                  <div className="text-container">
                    <h1>
                      <span className="turquoise">LearniStud Online</span>
                    </h1>
                    <h5 style={{marginTop:"-5px"}}>Learn Practice Achieve</h5>
                    <p className="p-large">
                      Just the virtual classroom you were looking for!. Get
                      started now with LearniStud to experience next gen
                      education!
                    </p>
                    <Link
                      className="btn-solid-lg page-scroll"
                      rel="noopener noreferrer"
                      to="/login"
                    >
                      GET STARTED
                    </Link>
                  </div>
                </div>
                <div className="col s6">
                  <div className="image-container">
                    <img
                      className="img-fluid"
                      src={headerImg}
                      alt="alternative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="services" className="cards-1">
          <div className="row container">
            <div className="row">
              <div className="col s12">
                <h2>Valued Services</h2>
                <p className="p-heading p-large">
                  We serve both teachers and learners in Primary and Secondary
                  education sectors by allowing timeous sharing of learning
                  resources between the learners and the teachers
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 card-services">
                <div className="card ">
                  <img
                    className="card-image"
                    src={servicesImg1}
                    alt="alternative"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Learners</h4>
                    <p>
                      Learners can access their learning materials, homeworks
                      and tests through a well designed easy to use students
                      portal. Videos too are available!
                    </p>
                  </div>
                </div>

                <div className="card">
                  <img
                    className="card-image"
                    src={servicesImg2}
                    alt="alternative"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Teachers</h4>
                    <p>
                      Teachers through their elite forum can send and receive
                      student work. The service comes with an automated way to
                      view perfomance and capture remedal records
                    </p>
                  </div>
                </div>

                <div className="card">
                  <img
                    className="card-image"
                    src={servicesImg3}
                    alt="alternative"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Educational Solutions</h4>
                    <p>
                      You are so much loved and your experience is what matters
                      the most. We can develop any educational solution that you
                      may thing of for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-2 sect-learn" >
          <div className="container">
            <div className="row">
              <div className="col s6">
                <div className="image-container">
                  <img
                    className="img-fluid"
                    src={kigsImg}
                    alt="alternative"
                  />
                </div>
              </div>
              <div className="col s6">
                <div className="text-container" style={{paddingLeft:"0px"}}>
                  <h2  style={{fontSize:"28px",fontWeight:"bold"}}>Learning Resources<br/>Wherever You are</h2>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">
                        For sure we know you know what's best for your brilliant
                        child
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">
                        We are here for one purpose, to deliver that best to
                        your child
                      </div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">
                        Everyone will be pleased from students to teachers to
                        parents
                      </div>
                    </li>
                  </ul>
                  <Link
                    className="btn-solid-reg"
                    rel="noopener noreferrer"
                    to="#"
                  >
                    REGISTER NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="pricing" className="cards-2 sect-learn">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h2>Multiple Pricing Options</h2>
                <p className="p-heading p-large">
                  We've prepared pricing plans for all budgets so you can get
                  started right away. They're great for absolutely everyone
                </p>
              </div>
            </div>
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
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                      <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                      <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                        <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
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
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                      <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                      <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                        <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
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
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                      <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                      <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
                        </li>
                        <li className="media">
                          <i className="fas fa-check" style={{paddingRight:"5px"}}></i>Dummy Feature 3a
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
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <p className="p-small">
                  Copyright © 2020{" "}
                  <Link rel="noopener noreferrer" to="#">
                    Our Name
                  </Link>{" "}
                  - All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
