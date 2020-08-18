import React, { Component } from "react";
import { HashLink as Link } from "react-router-hash-link";
import ReactPlayer from "react-player";
import { toWords } from "number-to-words";
import { AdminService } from "../../services/admin";

import M from "materialize-css";
import $ from "jquery";
import "../../assets/css/styles.css";

import carousel1 from "../../assets/images/carousel-5.png";
import carousel2 from "../../assets/images/carousel-4.png";
import carousel3 from "../../assets/images/carousel-3.png";
import carousel4 from "../../assets/images/carousel-2.png";

import logo from "../../assets/images/logo/logo.png";

import headerImg from "../../assets/images/welcome-img.jpg";
import servicesImg1 from "../../assets/images/gallary/service-1.jpg";
import servicesImg2 from "../../assets/images/gallary/service-2.jpg";
import servicesImg3 from "../../assets/images/gallary/service-3.1.jpg";
import servicesImg4 from "../../assets/images/gallary/service-4.jpg";
//import srvcimage4 from "../../assets/images/srvcimage4.svg";
//import newService from "../../assets/images/retest.jpg";
import Pricing from "../../components/pricing";

import OuterHeader from "../../components/outerHeader";
import OuterFooter from "../../components/outerFooter";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      logoPos: 0,
      logoEnd: false,
      plans: [],
      url: "https://www.youtube.com/watch?v=YGiorD1Aifg.mp4",
      quotes: [
        {
          quote:
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
          author: "Malcom X",
        },
        {
          quote:
            "If we teach today as we taught yesterday, we rob our children of tomorrow",
          author: "John Dewey",
        },
        {
          quote:
            "We need technology in every classroom and in every student and teacher’s hand, because it is the pen and paper of our time, and it is the lens through which we experience much of our world.",
          author: "David Warlick",
        },
        {
          quote:
            "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
          author: "Christian D. Larson",
        },
      ],
      currentPageNumber: 1,
    };

    this.handleNextClick.bind(this);
    this.handlePrevClick.bind(this);
  }

  componentDidMount() {
    this.getDashData();
    $(".js-height-full").height($(window).height() - 70);
    $(".js-height-parent").each(function () {
      $(this).height($(this).parent().first().height());
    });
    $("#video-modal-trigger").on("click", function () {
      const elem = document.getElementById("modal-demo1");
      const modal = new M.Modal(elem, {
        dismissible: false,
      });
      modal.open();
    });
    let carousel1 = document.querySelector(".carousel-1");
    let carousel2 = document.querySelector(".carousel-2");
    var instance1 = M.Carousel.init(carousel1, {
      dist: 0,
      padding: 0,
      indicators: true,
      duration: 100,
      fullWidth: true,
    });
    var instance2 = M.Carousel.init(carousel2, {
      dist: 0,
      padding: 0,
      indicators: true,
      duration: 100,
      fullWidth: true,
    });
    autoplay();
    function autoplay() {
      instance1.next();
      instance2.next();
      setTimeout(autoplay, 5500);
    }
  }

  getDashData() {
    AdminService.get_subs_plans().then((response) => {
      console.log(response);
      this.setState({ plans: response });
    });
  }
  handlePrevClick = () => {
    const pageNumber = this.state.currentPageNumber - 1;
    this.setState({ currentPageNumber: pageNumber });
  };
  handleNextClick = () => {
    const pageNumber = this.state.currentPageNumber + 1;
    this.setState({ currentPageNumber: pageNumber });
  };

  render() {
    return (
      <div>
        <OuterHeader></OuterHeader>

        <div className="content-pawa">
          <div id="welcome" className="header">
            <div className="container">
              <div
                className="row"
                style={{ paddingBottom: 70, paddingTop: 70 }}
              >
                <div className="col s12 m6">
                  <div
                    style={{
                      width: "50%",
                      marginLeft: 50,
                      borderTopLeftRadius: 50,
                      borderBottomRightRadius: 50,
                    }}
                  >
                    <img
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: 50,
                        borderBottomRightRadius: 50,
                      }}
                      width="100%"
                      src={logo}
                      alt="alternative"
                    />
                  </div>

                  <div className="text-container">
                    <h1>
                      <span className="turquoise text-shadow-2">
                        Pawa Cyber School
                      </span>
                    </h1>
                    <h5 style={{ marginTop: "-5px" }}>
                      Learn.Practice.Achieve
                    </h5>
                    <p className="p-large">
                      Get started now with Pawa Cyber School e-learning to
                      experience next gen education!
                    </p>
                    <Link
                      className="btn-solid-lg page-scroll z-depth-5"
                      rel="noopener noreferrer"
                      to="/login"
                    >
                      GET STARTED
                    </Link>
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="">
                    <img
                      className="img-fluid z-depth-5"
                      src={headerImg}
                      alt="alternative"
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="services" className="justfiyCenter">
            <div style={{ maxWidth: 1000 }}>
              <div className="row">
                <div className="col s12 center-align">
                  <h4 className="text-shadow-2" style={{ fontWeight: "bold" }}>
                    Valued Services
                  </h4>
                  <p className="p-large">
                    We serve both teachers and learners in Primary and Secondary
                    education sectors by allowing timeous sharing of learning
                    resources between the learners and the teachers
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <div
                    className="card padding-3 border-radius-10"
                    style={{ height: "100%", maxHeight: 420, minWidth: 250 }}
                  >
                    <div
                      className="card-image waves-effect waves-block waves-light border-radius-10"
                      style={{ maxHeight: 250 }}
                    >
                      <img src={servicesImg1} alt="office" />
                    </div>
                    <div className="card-content" style={{ minHeight: 160 }}>
                      <span className="card-title grey-text text-darken-4 text-shadow-2">
                        Virtual Reality
                      </span>
                      <p>
                        Live streaming classes - Teachers are able to have live
                        online classes with their learners, anytime and
                        anywhere.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col s12 m6">
                  <div
                    className="card padding-3 border-radius-10"
                    style={{ height: "100%", maxHeight: 420, minWidth: 250 }}
                  >
                    <div
                      className="card-image waves-effect waves-block waves-light border-radius-10"
                      style={{ maxHeight: 250 }}
                    >
                      <img src={servicesImg2} alt="office" />
                    </div>
                    <div className="card-content" style={{ minHeight: 160 }}>
                      <span className="card-title grey-text text-darken-4 text-shadow-2">
                        Animated Lessons
                      </span>
                      <p>
                        The platform includes state of the art 3D animated and
                        sketch video lessons designed according to the Namibian
                        curriculum. Learners will be able to visit the lessons
                        anytime, anywhere making studying flexible.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col s12 m6">
                  <div
                    className="card padding-3 border-radius-10"
                    style={{ height: "100%", maxHeight: 450, minWidth: 250 }}
                  >
                    <div
                      className="card-image waves-effect waves-block waves-light border-radius-10"
                      style={{ maxHeight: 250 }}
                    >
                      <img src={servicesImg3} alt="office" />
                    </div>
                    <div className="card-content" style={{ minHeight: 170 }}>
                      <span className="card-title grey-text text-darken-4 text-shadow-2">
                        E-Library
                      </span>
                      <p>
                        The platform has a built in e-library with recommended
                        ebooks and past examination papers. It gives the
                        learners an equal opportunity to have access to
                        essential books and other print material.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                  <div
                    className="card padding-3 border-radius-10"
                    style={{ height: 450, minWidth: 250 }}
                  >
                    <div
                      className="card-image waves-effect waves-block waves-light border-radius-10"
                      style={{ maxHeight: 250 }}
                    >
                      <img src={servicesImg4} alt="office" />
                    </div>
                    <div className="card-content" style={{ minHeight: 170 }}>
                      <span className="card-title grey-text text-darken-4 text-shadow-2">
                        Learning Management System
                      </span>
                      <p>
                        The educational platform includes a complete academic
                        management system where teachers, principals and
                        learners can interact. Teachers can create own content,
                        send and receive learners work. The service comes with
                        an automated way to view performance and capture
                        remedial records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="justfiyCenter" style={{ backgroundColor: "#edf2f4" }}>
            <div style={{ maxWidth: 1000, width: "100%" }}>
              <div className="row">
                <div className="col s12 padding-3">
                  <div className="col s12 center-align">
                    <h4
                      className="text-shadow-2"
                      style={{ fontWeight: "bold", marginBottom: 20 }}
                    >
                      Learning Resources Wherever You are
                    </h4>
                    <p className="p-large">
                      We serve both teachers and learners in Primary and
                      Secondary education sectors by allowing timeous sharing of
                      learning resources between the learners and the teachers
                    </p>
                  </div>
                  <ul
                    className="list-unstyled li-space-lg"
                    style={{
                      marginLeft: "30%",
                      marginTop: 140,
                      marginBottom: 30,
                    }}
                  >
                    <li>
                      <i
                        className="fas fa-check"
                        style={{ paddingRight: 10 }}
                      ></i>
                      <span className="media p-large">
                        For sure we know you know what's best for your brilliant
                        child
                      </span>
                    </li>
                    <li>
                      <i
                        className="fas fa-check"
                        style={{ paddingRight: 10 }}
                      ></i>
                      <span className="media p-large">
                        We are here for one purpose, to deliver that best to
                        your child
                      </span>
                    </li>
                    <li>
                      <i
                        className="fas fa-check"
                        style={{ paddingRight: 10 }}
                      ></i>
                      <span className="media p-large">
                        Everyone will be pleased from students to teachers to
                        parents
                      </span>
                    </li>
                  </ul>
                  <div className="justfiyCenter">
                    <Link
                      className="btn-solid-reg z-depth-5"
                      rel="noopener noreferrer"
                      to="/register"
                    >
                      REGISTER NOW
                    </Link>
                  </div>
                </div>

                <div className="col s12 padding-3">
                  <div
                    className="carousel carousel-slider carousel-1 border-radius-10"
                    data-indicators="true"
                  >
                    <div className="carousel-fixed-item">
                      <div className="container">
                        <h4 className="white-text">Join Our Online School.</h4>
                        <a
                          onClick={(e) => e.preventDefault()}
                          id="video-modal-trigger"
                          className="btn transparent waves-effect waves-light border-radius-10 btn-outline-white white-text"
                          href="#!"
                        >
                          <span className="display-none">a</span>
                        </a>
                      </div>
                    </div>
                    <div
                      className="carousel-item carousel-bg-img"
                      href="#one!"
                      style={{
                        background: `url(${carousel1}) `,
                      }}
                    ></div>

                    <div
                      className="carousel-item carousel-bg-img"
                      href="#two!"
                      style={{
                        background: `url(${carousel2}) `,
                      }}
                    ></div>

                    <div
                      className="carousel-item carousel-bg-img"
                      href="#three!"
                      style={{
                        background: `url(${carousel3}) `,
                      }}
                    ></div>
                    <div
                      className="carousel-item carousel-bg-img"
                      href="#four!"
                      style={{
                        background: `url(${carousel4}) `,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justfiyCenter">
            <div style={{ maxWidth: 1000, width: "100%" }}>
              <div className="row">
                <div className="col s12 padding-3 padding-bottom-0">
                  <div className="center-align">
                    <h4
                      className="text-shadow-2"
                      style={{ fontWeight: "bold" }}
                    >
                      Motivational Quotes
                    </h4>
                  </div>
                </div>

                <div className="col s12 padding-3 padding-top-0">
                  <div
                    className="carousel carousel-slider carousel-2 max-height-240"
                    data-indicators="true"
                  >
                    {this.state.quotes.map((quote, i) => (
                      <div
                        key={i}
                        className="carousel-item padding-5"
                        href={`#${toWords(i + 1)}!`}
                      >
                        <blockquote>
                          <i className="fas fa-quote-left"></i>
                          <p className="quote-text">{quote.quote}</p>
                          <i className="fas fa-quote-right"></i>
                          <footer className="quote-footer">
                            — <span>{quote.author}</span>
                          </footer>
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col s12 padding-3 justfiyCenter">
                  <div className="video-player border-radius-10 z-depth-5">
                    <ReactPlayer
                      width="100%"
                      url={this.state.url}
                      controls={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="pricing"
            className="cards-2 justfiyCenter"
            style={{ backgroundColor: "#edf2f4" }}
          >
            <div style={{ maxWidth: 1000 }}>
              <div className="row">
                <div className="col s12 center-align">
                  <h4
                    className="text-shadow-2"
                    style={{ fontWeight: "bold", marginBottom: 30 }}
                  >
                    Multiple Pricing Options
                  </h4>
                  <p className="p-large">
                    We've prepared pricing plans for all budgets so you can get
                    started right away. They're great for absolutely everyone
                  </p>
                </div>
              </div>
              <hr className="invis" />
              <div className="row">
                {this.state.plans.map((plan, i) => (
                  <Pricing key={i} plan={plan}></Pricing>
                ))}
              </div>
            </div>
          </div>
          <div id="modal-demo1" className="modal">
            <a
              href="#!"
              className="modal-close right z-index-1"
              onClick={this.pauseVideo}
            >
              <i className="material-icons">cancel</i>
            </a>
            <div>
              <ReactPlayer width="100%" url={this.state.url} controls={true} />
            </div>
            <blockquote style={{ marginTop: "7%" }}></blockquote>
          </div>

          <OuterFooter></OuterFooter>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
