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
import servicesImg1 from "../../assets/images/services-icon-1.svg";
import servicesImg2 from "../../assets/images/services-icon-2.svg";
import servicesImg3 from "../../assets/images/services-icon-3.svg";
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
      url: "https://cybers.azurewebsites.net/fe_assets/PawaCyber.mp4",
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
      setTimeout(autoplay, 5000);
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
          <header id="welcome" className="header z-depth-5">
            <div className="">
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
                        <span className="turquoise text-shadow-2">Pawa Cyber School</span>
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
          </header>

          <div id="services" className="cards-1">
            <div className="row container">
              <div className="row">
                <div className="col s12">
                  <h4 style={{ fontWeight: "bold" }}>Valued Services</h4>
                  <p className="p-heading p-large text-18">
                    We serve both teachers and learners in Primary and Secondary
                    education sectors by allowing timeous sharing of learning
                    resources between the learners and the teachers
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col s12 card-services">
                  <div className="card" style={{ height: 475 }}>
                    <img
                      className="card-image"
                      src={servicesImg1}
                      alt="alternative"
                    />
                    <div className="card-body">
                      <h4 className="card-title" style={{ fontWeight: "bold" }}>
                        Virtual Classroom
                      </h4>
                      <p className="text-18">
                        Online classrooms that allows students to communicate
                        with their teachers, view presentations or videos,
                        interact with other students, and engage with resources
                        in work groups
                      </p>
                    </div>
                  </div>

                  <div className="card" style={{ height: 475 }}>
                    <img
                      className="card-image"
                      src={servicesImg2}
                      alt="alternative"
                    />
                    <div className="card-body">
                      <h4 className="card-title" style={{ fontWeight: "bold" }}>
                        3D Animated, Sketch & Video Lessons
                      </h4>
                      <p className="text-18">
                        The system provides a range of content for students to
                        interact with, this goes from Video lessons, to sketch
                        drawings and 3D animated content. this is one of our
                        targets to establish a range of material that helps the
                        student understand the content much more.
                      </p>
                    </div>
                  </div>

                  <div className="card" style={{ height: 475 }}>
                    <img
                      className="card-image"
                      src={servicesImg3}
                      alt="alternative"
                    />
                    <div className="card-body">
                      <h4 className="card-title" style={{ fontWeight: "bold" }}>
                        E-Library
                      </h4>
                      <p className="text-18">
                        Pawa Cyber offers a resource repository which has a
                        range of books and materials. e-books, past exam papers,
                        study guides etc. this is all found at a convenient one
                        stop click inside the system. Access and convenience
                        made easier
                      </p>
                    </div>
                  </div>
                  <div className="card" style={{ height: 475 }}>
                    <img
                      className="card-image"
                      src={servicesImg3}
                      alt="alternative"
                    />
                    <div className="card-body">
                      <h4 className="card-title" style={{ fontWeight: "bold" }}>
                        Learning Management System{" "}
                      </h4>
                      <p className="text-18">
                        Here at Pawa Cyber We make to make sure that the
                        principals are included in the operations of their
                        school so we give them a platform that makes them in
                        involved in setting activities and managing them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basic-2 z-index-1">
            <div className="container">
              <div className="row mt-1">
                <div className="col s12 m6">
                  <div className="image-container">
                    <div
                      className="carousel carousel-slider carousel-1"
                      data-indicators="true"
                    >
                      <div className="carousel-fixed-item">
                        <div className="container">
                          <h4 className="white-text">
                            Join Our Online School.
                          </h4>
                          <a
                            id="video-modal-trigger"
                            className="btn transparent waves-effect waves-light btn-outline-white white-text"
                            href="#!"
                          >
                            Watch Demo
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
                <div className="col s12 m6">
                  <div className="text-container">
                    <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
                      Learning Resources
                      <br />
                      Wherever You are
                    </h2>
                    <ul className="list-unstyled li-space-lg">
                      <li>
                        <i
                          className="fas fa-check"
                          style={{ paddingRight: 10 }}
                        ></i>
                        <span className="media text-18">
                          For sure we know you know what's best for your
                          brilliant child
                        </span>
                      </li>
                      <li>
                        <i
                          className="fas fa-check"
                          style={{ paddingRight: 10 }}
                        ></i>
                        <span className="media text-18">
                          We are here for one purpose, to deliver that best to
                          your child
                        </span>
                      </li>
                      <li>
                        <i
                          className="fas fa-check"
                          style={{ paddingRight: 10 }}
                        ></i>
                        <span className="media text-18">
                          Everyone will be pleased from students to teachers to
                          parents
                        </span>
                      </li>
                    </ul>
                    <Link
                      className="btn-solid-reg z-depth-5"
                      rel="noopener noreferrer"
                      to="/register"
                    >
                      REGISTER NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="basic-2 card z-depth-5 header">
            <div className="container">
              <div className="row">
                <div className="col s12 m6">
                  <div
                    className="carousel carousel-slider carousel-2"
                    data-indicators="true"
                  >
                    {this.state.quotes.map((quote, i) => (
                      <div
                        key={i}
                        className="carousel-item padding-5"
                        href={`#${toWords(i + 1)}!`}
                      >
                        <div className="content">
                          <div className="notepaper">
                            <figure className="quote">
                              <blockquote className="curly-quotes">
                                {quote.quote}
                              </blockquote>
                              <figcaption className="quote-by">
                                —{quote.author}
                              </figcaption>
                            </figure>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="carousel-item padding-5 " href="#two!">
                      <div className="content">
                        <div className="notepaper">
                          <figure className="quote">
                            <blockquote className="curly-quotes">
                              {this.state.quotes[1].quote}
                            </blockquote>
                            <figcaption className="quote-by">
                              —{this.state.quotes[1].author}
                            </figcaption>
                          </figure>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item padding-5 " href="#three!">
                      <div className="content">
                        <div className="notepaper">
                          <figure className="quote">
                            <blockquote className="curly-quotes">
                              {this.state.quotes[2].quote}
                            </blockquote>
                            <figcaption className="quote-by">
                              —{this.state.quotes[2].author}
                            </figcaption>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item padding-5 " href="#four!">
                      <div className="content">
                        <div className="notepaper">
                          <figure className="quote">
                            <blockquote className="curly-quotes">
                              {this.state.quotes[3].quote}
                            </blockquote>
                            <figcaption className="quote-by">
                              —{this.state.quotes[3].author}
                            </figcaption>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col s12 m6">
                  <div className="card-body">
                    <ReactPlayer url={this.state.url} controls={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="invis" />
          <div id="pricing" className="cards-2">
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <h3
                    className="flow-text"
                    style={{ fontSize: 44, fontWeight: "bold" }}
                  >
                    Multiple Pricing Options
                  </h3>
                  <p
                    className="p-heading p-large  flow-text"
                    style={{ fontSize: 25 }}
                  >
                    We've prepared pricing plans for all budgets so you can get
                    started right away. They're great for absolutely everyone
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  {this.state.plans.map((plan, i) => (
                    <Pricing key={i} plan={plan}></Pricing>
                  ))}
                </div>
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
