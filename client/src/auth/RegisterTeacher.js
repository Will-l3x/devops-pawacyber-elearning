import React, { Component } from "react";
import { connect } from "react-redux";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";
import { Link } from "react-router-dom";

class RegisterTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      independentStudent: true,
      pendingSelection: true,
    };
  }
  selectOption(indepent) {
    this.setState({
      pendingSelection: false,
      independentStudent: indepent,
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <OuterHeader></OuterHeader>
        <div className="content-pawa">
          <div
            className="form-1"
            style={{ marginBottom: "-72px", backgroundColor: "white" }}
          >
            <div className="container" style={{ marginTop: "-100px" }}>
              <div className="row mt-1">
                <div className="col s12 m5">
                  <div
                    className="image-container"
                    style={{
                      paddingLeft: "10%",
                      paddingRight: "10%",
                      paddingTop: "20%",
                      width: "100%",
                    }}
                  >
                    <img className="img-fluid" src={img} alt="alternative" />
                  </div>
                </div>
                <div className="col s12 m7 cards-2">
                  <div className="ex-basic-1">
                    <h5>Please Your Choose Subscription Plan</h5>
                  </div>
                  <div className="col s12 m6">
                    <div className="card z-depth-4">
                      <div className="card-body min-height-370">
                        <div
                          className="card-title"
                          style={{ fontSize: "16px" }}
                        >
                          Free Account
                        </div>
                        <hr className="cell-divide-hr" />
                        <div className="price">
                          <span
                            className="currency"
                            style={{ fontSize: "17px" }}
                          >
                            N$
                          </span>
                          <span className="value">0</span>
                          <span
                            className="currency"
                            style={{ fontSize: "17px" }}
                          >
                            /month
                          </span>
                          {/* <div className="frequency">{this.pricingPlan.frequency}</div> */}
                        </div>
                        <hr className="cell-divide-hr" />
                        <ul className="list-unstyled li-space-lg">
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Limited library access
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Strorage space 0 GB
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Video conferencing limited participants
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Video conferencing limited to 2hrs per day
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Adverts on screen
                          </li>
                        </ul>

                        <hr className="cell-divide-hr" />

                        <Link
                          style={{ marginTop: 20 }}
                          className="btn-solid-reg page-scroll"
                          rel="noopener noreferrer"
                          to={`/register-limited-access-teacher/${this.props.match.params.referralId}`}
                        >
                          Proceed
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <div className="card z-depth-4">
                      <div className="label">
                        <p className="best-value">Best Value</p>{" "}
                      </div>
                      <div className="card-body min-height-370">
                        <div
                          className="card-title"
                          style={{ fontSize: "16px" }}
                        >
                          Premium Account
                        </div>
                        <hr className="cell-divide-hr" />
                        <div className="price">
                          <span
                            className="currency"
                            style={{ fontSize: "17px" }}
                          >
                            N$
                          </span>
                          <span className="value">19</span>
                          <span
                            className="currency"
                            style={{ fontSize: "17px" }}
                          >
                            /month
                          </span>
                          {/* <div className="frequency">{this.pricingPlan.frequency}</div> */}
                        </div>
                        <hr className="cell-divide-hr" />
                        <ul className="list-unstyled li-space-lg">
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Unlimited library access
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Strorage space 1 GB
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Video conferencing unlimited participants
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            Video conferencing time unlimited
                          </li>
                          <li className="media">
                            <i
                              className="fas fa-check"
                              style={{ paddingRight: "5px" }}
                            ></i>
                            No adverts
                          </li>
                        </ul>
                        <hr className="cell-divide-hr" />
                        <Link
                          style={{ marginTop: 20 }}
                          className="btn-solid-reg page-scroll"
                          rel="noopener noreferrer"
                          to={`/register-premium-access-teacher/${this.props.match.params.referralId}`}
                        >
                          Proceed
                        </Link>
                      </div>
                    </div>
                  </div>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTeacher);
