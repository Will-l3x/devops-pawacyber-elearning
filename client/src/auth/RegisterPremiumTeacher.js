import React, { Component } from "react";
import { connect } from "react-redux";

import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";

import { PaymentService } from "../services/paymentService";
import $ from "jquery";
import M from "materialize-css";
import "../assets/css/terms.css";
import { AsyncStorage } from "AsyncStorage";
import InputMask from "react-input-mask";
import { Redirect } from "react-router";

class RegisterPremiumTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      selectedSchool: "37",
      redirect: false,
      proceedToPay: false,
      proceedToVerification: false,
      loading: false,
      numberOfsubs: 0,
      selectedsubs: [],
      defaultSubs: [],
      message: "",
    };
    this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
    this.onChange = (data) => {
      this.setState({ id_num: data.target.value });
    };
  }

  componentDidMount() {
    M.AutoInit();
    function legalTerms() {
      var totalLegalRules = $(".legal__rule").length;
      if ($(".legal").hasClass("is-expanded")) {
        $(".legal__rules")
          .attr("aria-expanded", "true")
          .attr("aria-hidden", "false")
          .css("opacity", "1.0")
          .show();
        $(".legal__terms").on("scroll", function () {
          legalProgress();
        });
        $("#agree").addClass("disabled");
      } else {
        $(".legal__terms").on("scroll", function () {
          if (
            $(this).scrollTop() + $(this).innerHeight() >=
            this.scrollHeight
          ) {
            $(".legal__rules")
              .attr("aria-expanded", "true")
              .attr("aria-hidden", "false")
              .slideDown(100 * totalLegalRules + 10)
              .animate({ opacity: "1" }, 175);

            $("#agree").removeClass("disabled");
          }
          legalProgress();
        });
      }
    }

    function legalRules() {
      // Terms & Conditions - Checkbox
      $(
        ".toggle--checkbox .toggle__label, .toggle--checkbox .toggle__disagree"
      ).remove();

      // Terms & Conditions - Buttons
      $(".toggle--buttons .control-indicator").remove();

      $(document).on(
        "click",
        ".toggle--buttons .toggle__agree .checkbox",
        function () {
          if ($(this).prop("checked", true)) {
            $(this)
              .parent(".toggle__agree")
              .siblings(".toggle__disagree")
              .find(".checkbox")
              .prop("checked", false);

            // Terms & Conditions - Required Buttons
            $(this).closest(".legal__rule").css("background", "#fff");
          }
        }
      );

      $(document).on(
        "click",
        ".toggle--buttons .toggle__disagree .checkbox",
        function () {
          if ($(this).prop("checked", true)) {
            $(this)
              .parent(".toggle__disagree")
              .siblings(".toggle__agree")
              .find(".checkbox")
              .prop("checked", false);

            // Terms & Conditions - Required Buttons
            if ($(this).closest(".legal__rule").hasClass("is-required")) {
              $(this).closest(".legal__rule").css("background", "#fdf6f6");
            }
          }
        }
      );
    }

    function legalProgress() {
      var legalTermsScrollHeight =
        $(".legal__terms-scroll").height() - $(".legal__terms").height();
      var legalTermsScrollTop = $(".legal__terms").scrollTop();
      var legalProgress = Math.max(
        0,
        Math.min(1, legalTermsScrollTop / legalTermsScrollHeight)
      );
      $(".legal__progress").css({
        width: legalProgress * 100 + "%" + 10 + "px",
      });
    }

    function overlay() {
      $(document).on("click", ".overlay--open", function () {
        $("body").css("overflow", "hidden");
        $(".overlay").fadeIn(200);
        $(".overlay > .container")
          .fadeIn(400)
          .animate({ marginTop: "10px" }, 800);
      });

      $(document).on("click", ".overlay--close", function () {
        $("body").css("overflow", "visible");
        $(".overlay > .container")
          .fadeOut(400)
          .animate({ marginTop: "10px" }, 800);
        $(".overlay").fadeOut(200);
      });
    }

    overlay();
    legalTerms();
    legalRules();
  }

  handleTitleDropdownChange(event) {
    this.setState({ gender: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (event.target.vpassword.value === event.target.password.value) {
      if (mediumRegex.test(event.target.password.value)) {
        var registerAdmin = {
          roleid: 1,
          email: event.target.email.value,
          password: event.target.password.value,
          //phone_number: event.target.phone_number.value,
          firstname: event.target.firstname.value,
          lastname: event.target.lastname.value,
          title: this.state.gender === "1" ? "Mr" : "Miss",
          vpassword: event.target.vpassword.value,
          dob: event.target.dob.value,
          //genderid: this.state.gender,
          schoolid: 37,
          grade: event.target.grade.value,
        };
        const referralId = this.props.match.params.referralId;
        localStorage.removeItem("teacherRegData");
        localStorage.setItem("teacherRegData", JSON.stringify(registerAdmin));
        localStorage.removeItem("refferalId");
        localStorage.setItem("refferalId", JSON.stringify(referralId));

        try {
          AsyncStorage.setItem("teacherRegData", JSON.stringify(registerAdmin));
          AsyncStorage.setItem("referralId", JSON.stringify(referralId));
          setTimeout(function () {
            this.handlePayment(registerAdmin);
          }, 300);
        } catch (error) {
          M.toast({
            html: "Failed to save data",
            classes: "red accent-2",
          });
        }
      } else {
        M.toast({
          html:
            "Low password strength. Password should include a minimum of 8 characters. Including at least 1 digit.",
          classes: "red",
        });
      }
    } else {
      M.toast({
        html: "Password not matching",
        classes: "red",
      });
    }
  };

  handlePayment = (det) => {
    var paymentDetails = {
      paymentAmount: parseFloat(20),
      customerEmail: det.email,
      customerFirstName: det.firstname,
      customerLastName: det.lastname,
      serviceDescription: "Teacher Premium Access",
      routeSuccessLink:
        "https://pawacyberschool.net/#/teacher-payment-confirmed",
      routeFailureLink: "https://pawacyberschool.net/#/payment-canceled",
    };

    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
    AsyncStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

    PaymentService.createToken(paymentDetails).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "Payment Failed",
          classes: "red accent-2",
        });
      } else if (response.success === false) {
        M.toast({
          html: response.message,
          classes: "red",
        });
      } else {
        M.toast({
          html: "You are being redirected to the payment page",
          classes: "green",
        });
        // window.open(`https://secure1.sandbox.directpay.online/payv2.php?ID=${response.data.transactionToken}`,'_blank');
        document.getElementById("contact").reset();

        this.setState({ redirect: true });

        window.location.href = ` https://secure.3gdirectpay.com/pay.asp?ID=${response.data.transactionToken}`;
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <OuterHeader></OuterHeader>
        <div className="content-pawa">
          <div
            className="form-1"
            style={{ marginBottom: "-72px", backgroundColor: "white" }}
          >
            <div className="container" style={{ marginTop: "-100px" }}>
              <div className="row">
                <div className="col s12 m5">
                  <div
                    style={{
                      paddingLeft: "10%",
                      paddingRight: "10%",
                      paddingTop: "20%",
                      width: "100%",
                    }}
                  >
                    <img className="img-fluid" src={img} alt="alternative" />
                  </div>
                </div>{" "}
                <div className="col s12 m7">
                  <form
                    id="contact"
                    data-toggle="validator"
                    data-focus="false"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="col s12 m12">
                      <div className="ex-basic-1">
                        <h5>ACCOUNT INFORMATION</h5>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="lastname"
                                  title="Last Name *"
                                />
                                <input
                                  id="lastname"
                                  type="text"
                                  className="validate"
                                  name="lastname"
                                  required
                                ></input>
                              </fieldset>
                            </div>
                          </div>
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="firstname"
                                  title="First Name *"
                                />
                                <input
                                  id="firstname"
                                  type="text"
                                  className="validate"
                                  name="firstname"
                                  required
                                ></input>
                              </fieldset>
                            </div>
                          </div>
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="gender"
                                  title="Gender *"
                                />
                                <select
                                  name="gender"
                                  onChange={this.handleTitleDropdownChange}
                                >
                                  <option value="1">Male</option>
                                  <option value="2">Female</option>
                                </select>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="dob"
                                  title="Date of Birth *"
                                />
                                <input
                                  id="dob"
                                  type="date"
                                  className="validate"
                                  name="dob"
                                  required
                                />
                              </fieldset>
                            </div>
                          </div>
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="grade"
                                  title="Grade:"
                                />

                                <input
                                  className="form-input input-meeting"
                                  id="grade"
                                  type="number"
                                  min="0"
                                  max="12"
                                  name="grade"
                                  required
                                />
                              </fieldset>
                            </div>
                          </div>

                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="phone_number"
                                  title="Phone Number *"
                                />
                                <InputMask
                                  id="phone_number"
                                  type="text"
                                  className="validate"
                                  name="phone_number"
                                  required
                                  mask="+264\ 99 999 9999"
                                  maskChar=" "
                                />
                              </fieldset>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="email"
                                  title="Email *"
                                />
                                <input
                                  id="email"
                                  type="email"
                                  className="validate"
                                  name="email"
                                  required
                                ></input>
                              </fieldset>
                            </div>
                          </div>

                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="password"
                                  title="Password *"
                                />
                                <input
                                  id="password"
                                  type="password"
                                  className="validate"
                                  name="password"
                                  required
                                ></input>
                              </fieldset>
                            </div>
                          </div>
                          <div className="col s12 m4">
                            <div className="input-field">
                              <fieldset className="form-group">
                                <ReactFormLabel
                                  htmlFor="vpassword"
                                  title="Retype Password *"
                                />
                                <input
                                  id="vpassword"
                                  type="password"
                                  className="validate"
                                  name="vpassword"
                                  required
                                ></input>
                              </fieldset>
                            </div>
                          </div>

                          <div className="col s12 m4"> </div>
                        </div>
                        <div className="form-group justify-center">
                          <button className="form-control-submit-button">
                            Proceed To Pay
                          </button>
                        </div>
                        <div className="form-message">
                          <div
                            id="cmsgSubmit"
                            className="h3 text-center hidden"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </form>
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

class ReactFormLabel extends React.Component {
  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPremiumTeacher);
