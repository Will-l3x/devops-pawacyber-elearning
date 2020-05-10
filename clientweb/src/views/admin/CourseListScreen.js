import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import blog_1 from "../../assets/images/blog_1.jpg";
import blog_2 from "../../assets/images/blog_2.jpg";
import blog_3 from "../../assets/images/blog_3.jpg";
import blog_4 from "../../assets/images/blog_4.jpg";
import blog_5 from "../../assets/images/blog_5.jpg";
import blog_6 from "../../assets/images/blog_6.jpg";

export class CourseListScreen extends Component {
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

        <section id="content">
          <div className="container">
            <div className="all-title-box z-depth-1-half">
              <div className="container">
                <h1 className="center-align flow-text">
                  List of Courses We offer
                </h1>
              </div>
            </div>

            <div id="overviews" className="section wb">
              <div className="container">
                <hr className="hr3"></hr>
                <div className="section-title row center-align flow-text">
                  <div className="col m8 offset-m2">
                    <p className="lead">
                      Lorem Ipsum dolroin gravida nibh vel velit auctor aliquet.
                      Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
                      consequat ipsum, nec sagittis sem!
                    </p>
                  </div>
                </div>
                <hr className="hr3"></hr>

                <div className="row">
                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_1} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Engineering
                            </Link>
                          </h2>
                        </div>
                        <div className="course-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_2} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Hotel Management
                            </Link>
                          </h2>
                        </div>
                        <div className="blog-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_3} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Biotechnology
                            </Link>
                          </h2>
                        </div>
                        <div className="course-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_4} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Medical Sciences
                            </Link>
                          </h2>
                        </div>
                        <div className="course-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="hr3"></hr>

                <div className="row">
                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_4} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Medical Sciences
                            </Link>
                          </h2>
                        </div>
                        <div className="course-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_2} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Hotel Management
                            </Link>
                          </h2>
                        </div>
                        <div className="blog-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_5} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Finance
                            </Link>
                          </h2>
                        </div>
                        <div className="course-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div className="course-item">
                      <div className="image-blog">
                        <img src={blog_6} alt="" className="img-fluid"></img>
                      </div>
                      <div className="course-br">
                        <div className="course-title">
                          <h2>
                            <Link to="/course-outline" title="">
                              Fashion Designing
                            </Link>
                          </h2>
                        </div>
                        <div className="course-desc">
                          <p>
                            Lorem ipsum door sit amet, fugiat deicata avise id
                            cum, no quo maiorum intel ogrets geuiat operts
                            elicata libere avisse id cumlegebat, liber regione
                            eu sit....{" "}
                          </p>
                        </div>
                        
                      </div>
                      <div className="course-meta-bot">
                        <ul>
                          <li>
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            6 Month
                          </li>
                          <li>
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>{" "}
                            56 Video Tutorials
                          </li>
                          <li>
                            <i className="fa fa-book" aria-hidden="true"></i> 7
                            Books
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CourseListScreen);
