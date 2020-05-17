import React, { Component } from "react";

import "../../assets/css/styles.css";
import "../../assets/css/swiper.css";
import "../../assets/css/magnific-popup.css";
import { Link } from "react-router-dom";
//import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
export class HomeScreen extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <Link
            className="navbar-brand "
            rel="noopener noreferrer"
            to="index.html"
          >
            LearniStud
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-awesome fas fa-bars"></span>
            <span className="navbar-toggler-awesome fas fa-times"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
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

              <li className="nav-item dropdown">
                <Link
                  className="nav-link page-scroll"
                  rel="noopener noreferrer"
                  to="#about"
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link page-scroll"
                  rel="noopener noreferrer"
                  to="#contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <span className="nav-item social-icons">
              <span className="fa-stack">
                <Link rel="noopener noreferrer" to="#your-link">
                  <i className="fas fa-circle fa-stack-2x facebook"></i>
                  <i className="fab fa-facebook-f fa-stack-1x"></i>
                </Link>
              </span>
              <span className="fa-stack">
                <Link rel="noopener noreferrer" to="#your-link">
                  <i className="fas fa-circle fa-stack-2x twitter"></i>
                  <i className="fab fa-twitter fa-stack-1x"></i>
                </Link>
              </span>
            </span>
          </div>
        </nav>

        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="text-container">
                    <h1>
                      <span className="turquoise">LearniStud online</span>
                    </h1>
                    <h2>Learn Practice Achieve</h2>
                    <p className="p-large">
                      Just the virtual classroom you were looking for!. Get
                      started now with LearniStud to experience next gen
                      education!
                    </p>
                    <Link
                      className="btn-solid-lg page-scroll"
                      rel="noopener noreferrer"
                      to="#services"
                    >
                      GET STARTED
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="image-container">
                    <img
                      className="img-fluid"
                      src="images/girl.png"
                      alt="alternative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="services" className="cards-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Business Growth Services</h2>
                <p className="p-heading p-large">
                  We serve both teachers and learners in Primary and Secondary
                  education sectors by allowing timeous sharing of learning
                  resources between the learners and the teachers
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <img
                    className="card-image"
                    src="images/services-icon-1.svg"
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
                    src="images/services-icon-2.svg"
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
                    src="images/services-icon-3.svg"
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

        <div className="basic-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="image-container">
                  <img
                    className="img-fluid"
                    src="images/gids.png"
                    alt="alternative"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="text-container">
                  <h2>Learning Resources Wherever You are</h2>
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

        <div id="pricing" className="cards-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Multiple Pricing Options</h2>
                <p className="p-heading p-large">
                  We've prepared pricing plans for all budgets so you can get
                  started right away. They're great for absolutely everyone
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
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
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 1</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 2</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 3</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 3a</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-times"></i>
                        <div className="media-body">Dummy Feature 4</div>
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
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 1</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 2</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 3</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 3a</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-times"></i>
                        <div className="media-body">Dummy Feature 4</div>
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
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 1</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 2</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 3</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-check"></i>
                        <div className="media-body">Dummy Feature 3a</div>
                      </li>
                      <li className="media">
                        <i className="fas fa-times"></i>
                        <div className="media-body">Dummy Feature 4</div>
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

        <div id="about" className="basic-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>About The Team</h2>
                <p className="p-heading p-large">
                  Meat our team of specialized marketers and business developers
                  which will help you research new products and launch them in
                  new emerging markets
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="team-member">
                  <div className="image-wrapper">
                    <img
                      className="img-fluid"
                      src="images/team-member-2.svg"
                      alt="alternative"
                    />
                  </div>
                  <p className="p-large">
                    <strong>Member Name</strong>
                  </p>
                  <p className="job-title">Software Developer</p>
                  <span className="social-icons">
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x facebook"></i>
                        <i className="fab fa-facebook-f fa-stack-1x"></i>
                      </Link>
                    </span>
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x twitter"></i>
                        <i className="fab fa-twitter fa-stack-1x"></i>
                      </Link>
                    </span>
                  </span>
                </div>

                <div className="team-member">
                  <div className="image-wrapper">
                    <img
                      className="img-fluid"
                      src="images/team-member-2.svg"
                      alt="alternative"
                    />
                  </div>
                  <p className="p-large">
                    <strong>Member Name</strong>
                  </p>
                  <p className="job-title">Graphic Desinger Developer</p>
                  <span className="social-icons">
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x facebook"></i>
                        <i className="fab fa-facebook-f fa-stack-1x"></i>
                      </Link>
                    </span>
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x twitter"></i>
                        <i className="fab fa-twitter fa-stack-1x"></i>
                      </Link>
                    </span>
                  </span>
                </div>

                <div className="team-member">
                  <div className="image-wrapper">
                    <img
                      className="img-fluid"
                      src="images/team-member-2.svg"
                      alt="alternative"
                    />
                  </div>
                  <p className="p-large">
                    <strong>Member Name </strong>
                  </p>
                  <p className="job-title">Software Engineer</p>
                  <span className="social-icons">
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x facebook"></i>
                        <i className="fab fa-facebook-f fa-stack-1x"></i>
                      </Link>
                    </span>
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x twitter"></i>
                        <i className="fab fa-twitter fa-stack-1x"></i>
                      </Link>
                    </span>
                  </span>
                </div>

                <div className="team-member">
                  <div className="image-wrapper">
                    <img
                      className="img-fluid"
                      src="images/team-member-4.svg"
                      alt="alternative"
                    />
                  </div>
                  <p className="p-large">
                    <strong>Member Name</strong>
                  </p>
                  <p className="job-title">Product Manager</p>
                  <span className="social-icons">
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x facebook"></i>
                        <i className="fab fa-facebook-f fa-stack-1x"></i>
                      </Link>
                    </span>
                    <span className="fa-stack">
                      <Link rel="noopener noreferrer" to="#your-link">
                        <i className="fas fa-circle fa-stack-2x twitter"></i>
                        <i className="fab fa-twitter fa-stack-1x"></i>
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="contact" className="form-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Contact Information</h2>
                <ul className="list-unstyled li-space-lg">
                  <li className="address">
                    Don't hesitate to give us a call or send us a contact form
                    message
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>Harare Zimbabwe
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <Link
                      className="turquoise"
                      rel="noopener noreferrer"
                      to="tel:+263785302628"
                    >
                      +263 78 530 2628
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <Link
                      className="turquoise"
                      rel="noopener noreferrer"
                      to="mailto:keptac.flutter@gmail.com"
                    >
                      Email Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="map-responsive">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d319097.96859987295!2d30.894229441627157!3d-17.824354532951162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4ee1bdddb35%3A0xa5143b9be5134f2f!2sHarare!5e0!3m2!1sen!2szw!4v1589677925407!5m2!1sen!2szw"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div className="col-lg-6">
                <form
                  id="contactForm"
                  data-toggle="validator"
                  data-focus="false"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input"
                      id="cname"
                      required
                    />
                    <label className="label-control" for="cname">
                      Name
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control-input"
                      id="cemail"
                      required
                    />
                    <label className="label-control" for="cemail">
                      Email
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-textarea"
                      id="cmessage"
                      required
                    ></textarea>
                    <label className="label-control" for="cmessage">
                      Your message
                    </label>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control-submit-button"
                    >
                      SUBMIT MESSAGE
                    </button>
                  </div>
                  <div className="form-message">
                    <div
                      id="cmsgSubmit"
                      className="h3 text-center hidden"
                    ></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="footer-col">
                  <h4>About Smart Class</h4>
                  <p>
                    We're passionate about offering educational services to
                    african children
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-col middle">
                  <h4>Important Links</h4>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-square"></i>
                      <div className="media-body">
                        Our business partners{" "}
                        <Link
                          className="turquoise"
                          rel="noopener noreferrer"
                          to="#your-link"
                        >
                          Your Company Name
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-col last">
                  <h4>Social Media</h4>
                  <span className="fa-stack">
                    <Link rel="noopener noreferrer" to="#your-link">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-facebook-f fa-stack-1x"></i>
                    </Link>
                  </span>
                  <span className="fa-stack">
                    <Link rel="noopener noreferrer" to="#your-link">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-twitter fa-stack-1x"></i>
                    </Link>
                  </span>

                  <span className="fa-stack">
                    <Link rel="noopener noreferrer" to="#your-link">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-instagram fa-stack-1x"></i>
                    </Link>
                  </span>
                  <span className="fa-stack">
                    <Link rel="noopener noreferrer" to="#your-link">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-linkedin-in fa-stack-1x"></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
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
