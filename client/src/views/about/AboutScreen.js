import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import OuterHeader from "../../components/outerHeader";
import OuterFooter from "../../components/outerFooter";


class AboutScreen extends Component {
    render() {
        return (
          <div>
            <OuterHeader></OuterHeader>
            <div className="content-pawa">
              <div className="ex-basic-1">
                <h4>Pawa Cyber School</h4>
              </div>

              <div
                className="ex-basic-2"
                style={{ marginLeft: "70px", marginRight: "70px"}}
              >
                <div className="container">
                  <div className="row mt-1">
                    <div className="text-container">
                      <h5>About Us</h5>
                      <p>
                      Welcome to PAWA Cyber School E-Learning, a leading provider of education technology to schools, and students. Our solutions address the critical needs of educators, students, parents and individuals. They help improve the quality of education, support continuous school improvement and help all students achieve academic and career success. 
                      Pawa Cyber School e-Learning is based in Ondangwa, Namibia.It was established in 2018 by Esser Pawa Naukosho. Mrs Naukosho is a retired school principal who has a wealth of expertise as teacher.
                      The e-learning platform aims to provide schools and learners with state of the art educational content accordance with the Namibian school curriculum, a learning management system, mobile application, and a built in elibrary. 
                      Pawa Cyber School eLearning has an active involvement in education in the country through networks and partnerships. Some of these are with teachers, schools and learners. 
                      Our products and services help students develop and apply foundational technology skills, provide teachers with resources to integrate technology across the curriculum. We strive to make a difference in the lives of learners as they upgrade their skills, increase their self-esteem, discover successful employment, and become better, more self-sufficient students, employees, and citizens.
                      </p>
                      <p>
                        When you first register for a Pawa Cyber School eLearning
                        account, and when you use the Services, we collect some{" "}
                        <Link
                          className="turquoise"
                          to="#"
                          rel="noopener noreferrer"
                        >
                          Personal Information
                        </Link>{" "}
                        about you such as:
                      </p>
                      <div className="row mt-1">
                        <div className="col s12 m6">
                          <ul className="list-unstyled li-space-lg indent">
                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              The geographic area where you use your computer
                              and mobile devices</p>
                    
                            </li>
                            <li className="media">
                            <p>          
                              <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Your full name, username, and email address and
                              other contact details</p>
                            </li>

                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Other optional information as part of your account
                              profile</p>
                            </li>
                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Your IP Address and, when applicable, timestamp
                              related to your consent and confirmation of
                              consent</p>
                            </li>
                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Other information submitted by you or your
                              organizational representatives via various methods</p>
                            </li>
                          </ul>
                        </div>

                        <div className="col s12 m6">
                          <ul className="list-unstyled li-space-lg indent">
                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Your billing address and any necessary other
                              information to complete any financial transaction,
                              and when making purchases through the Services, we
                              may also collect your credit card or PayPal
                              information</p>
                            </li>
                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Images or other files that you may publish via our
                              Services</p>
                            </li>
                            <li className="media">
                            <p>          <i className="fas fa-square" style={{paddingRight:"10px"}}></i>
                              Information (such as messages, posts, comments,
                              pages, profiles, images) we may receive relating
                              to communications you send us, such as queries or
                              comments concerning</p>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div sid="contact"  style={{ textAlign:"center"}}>
                        <div class="container">
                          <div class="row  mt-1">
                            <div class="col-lg-12">
                             
                              <div className="ex-basic-1">
                                <h4>Contact Information</h4>
                              </div>
                              <ul class="list-unstyled li-space-lg">
                                <li class="address">
                                  Don't hesitate to give us a call or send us a
                                  contact form message
                                </li>
                                <li>
                                  <i class="fas fa-map-marker-alt"></i> Unit 2,
                                  Sun Square Mall, Ondangwa Namibia
                                </li>

                                <br />
                                <li>
                                  <i class="fas fa-mobile-alt"></i>
                                  <a
                                    class="turquoise"
                                    href="tel:+264852247137"
                                  >
                                    +264 85 224 7137
                                    
                                  </a>
                                </li>
                                <li>
                                  <i class="fas fa-phone"></i>
                                  <a class="turquoise" href="tel:+264812247137">
                                  +264 81 224 7137
                                  </a>
                                </li>
                                <li>
                                  <i class = "fas fa-email"></i>
                                  <a class = "turquoise" href = "email: info@pawacyberschool.net">
                                    info@pawacyberschool.net

                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="row mt-1">
                            <div class="col s12 m6">
                              <div class="map-responsive">
                                <iframe
                                style={{width:"100%", height:"45vh"}}
                                  title="iframe1"
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60746.325427046104!2d15.938672078129471!3d-17.902029842582213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b931025b0e8c757%3A0x7b9eb2be2e8e0ad5!2sOndangwa%2C%20Namibia!5e0!3m2!1sen!2szw!4v1592357207135!5m2!1sen!2szw"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                            <div  class="col s12 m1"> </div>
                            <div className="col s12 m5">
                              <form
                                id="contactForm"
                                data-toggle="validator"
                                data-focus="false"
                                novalidate="true"
                              >
                                <div class="form-group">
                                  <input
                                    type="text"
                                    class="form-control-input"
                                    id="cname"
                                    required=""
                                  />
                                  <label class="label-control" for="cname">
                                    Name
                                  </label>
                                  <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                  <input
                                    type="email"
                                    class="form-control-input"
                                    id="cemail"
                                    required=""
                                  />
                                  <label class="label-control" for="cemail">
                                    Email
                                  </label>
                                  <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                  <textarea
                                    class="form-control-textarea"
                                    id="cmessage"
                                    required=""
                                  ></textarea>
                                  <label class="label-control" for="cmessage">
                                    Your message
                                  </label>
                                  <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                  <button
                                    type="submit"
                                    class="form-control-submit-button disabled"
                                  >
                                    SUBMIT MESSAGE
                                  </button>
                                </div>
                                <div class="form-message">
                                  <div
                                    id="cmsgSubmit"
                                    class="h3 text-center hidden"
                                  ></div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <a className="btn-outline-reg back" href="/">
                        BACK
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <OuterFooter></OuterFooter>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
