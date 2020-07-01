import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import OuterHeader from "../../components/outerHeader";
import OuterFooter from "../../components/outerFooter";


export class AboutScreen extends Component {
    render() {
        return (
          <div>
            <OuterHeader></OuterHeader>
            <div className="content-pawa">
              <div className="ex-basic-1">
                <h4>About PawaCyber</h4>
              </div>

              <div
                className="ex-basic-2"
                style={{ marginLeft: "70px", marginRight: "70px" }}
              >
                <div className="container">
                  <div className="row mt-1">
                    <div className="text-container">
                      <h5>Private Data We Receive And Collect</h5>
                      <p>
                        PawaCyber School eLearning also automatically collects
                        and receives certain information from your computer or
                        mobile device, including the activities you perform on
                        our Website, the Platforms, and the Applications, the
                        type of hardware and software you are using (for
                        example, your operating system or browser), and
                        information obtained from cookies. For example, each
                        time you visit the Website or otherwise use the
                        Services, we automatically collect your IP address,
                        browser and device type, access times, the web page from
                        which you came, the regions from which you navigate the
                        web page, and the web page(s) you access (as
                        applicable).
                      </p>
                      <p>
                        When you first register for a PawaCyber School eLearning
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
                              <i className="fas fa-square"></i>
                              The geographic area where you use your computer
                              and mobile devices
                            </li>
                            <li className="media">
                              <i className="fas fa-square"></i>
                              Your full name, username, and email address and
                              other contact details
                            </li>

                            <li className="media">
                              <i className="fas fa-square"></i>
                              Other optional information as part of your account
                              profile
                            </li>
                            <li className="media">
                              <i className="fas fa-square"></i>
                              Your IP Address and, when applicable, timestamp
                              related to your consent and confirmation of
                              consent
                            </li>
                            <li className="media">
                              <i className="fas fa-square"></i>
                              Other information submitted by you or your
                              organizational representatives via various methods
                            </li>
                          </ul>
                        </div>

                        <div className="col s12 m6">
                          <ul className="list-unstyled li-space-lg indent">
                            <li className="media">
                              <i className="fas fa-square"></i>
                              Your billing address and any necessary other
                              information to complete any financial transaction,
                              and when making purchases through the Services, we
                              may also collect your credit card or PayPal
                              information
                            </li>
                            <li className="media">
                              <i className="fas fa-square"></i>
                              Images or other files that you may publish via our
                              Services
                            </li>
                            <li className="media">
                              <i className="fas fa-square"></i>
                              Information (such as messages, posts, comments,
                              pages, profiles, images) we may receive relating
                              to communications you send us, such as queries or
                              comments concerning
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div id="contact" class="form-2">
                        <div class="container">
                          <div class="row  mt-1">
                            <div class="col-lg-12">
                              <h2>Contact Information</h2>
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
                                    href="tel:+264812247137"
                                  >
                                    +264 81 224 7137
                                  </a>
                                </li>
                                <li>
                                  <i class="fas fa-phone"></i>
                                  <a class="turquoise" href="tel:+264851247976">
                                    +264 85 124 7976
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="row mt-1">
                            <div class="col s12 m6">
                              <div class="map-responsive">
                                <iframe
                                  title="iframe1"
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60746.325427046104!2d15.938672078129471!3d-17.902029842582213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b931025b0e8c757%3A0x7b9eb2be2e8e0ad5!2sOndangwa%2C%20Namibia!5e0!3m2!1sen!2szw!4v1592357207135!5m2!1sen!2szw"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                            <div class="col s12 m6">
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

                      <a className="btn-outline-reg back" href="/">
                        BACK
                      </a>
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
