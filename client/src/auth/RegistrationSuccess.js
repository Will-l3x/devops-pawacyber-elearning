import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";
import { AdminService } from "../services/admin";
import { AuthService } from "../services/authServices";
import { HashLink as Link } from "react-router-hash-link";
import { AsyncStorage } from "AsyncStorage";

class RegisterSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationDetails: null,
      subscriptionDetails: null,
      enrolmentDetails: null,
      paymentdetails: null,
      proceed: false,
      message: "Completing the registration...",
    };
  }

  async componentDidMount() {
    M.AutoInit();
    M.toast({
      html: "Transaction Successful",
      classes: "green accent-3",
    });
    const thiz = this;
    // Fetching data
    try {
      const registrationDetails = await AsyncStorage.getItem("studentData");
      const subscriptionDetails = await AsyncStorage.getItem("selectedPackage");
      const enrolmentDetails = await AsyncStorage.getItem("selectedSubjects");
      const paymentdetails = await AsyncStorage.getItem("paymentDetails");
      if (
        registrationDetails !== null &&
        subscriptionDetails !== null &&
        enrolmentDetails !== null &&
        paymentdetails !== null
      ) {
        this.setState({
          registrationDetails: JSON.parse(registrationDetails),
          subscriptionDetails: JSON.parse(subscriptionDetails),
          enrolmentDetails: JSON.parse(enrolmentDetails),
          paymentdetails: JSON.parse(paymentdetails),
        });

        setTimeout(
          function () {
            thiz.register(JSON.parse(registrationDetails));
          }.bind(this),
          1000
        );
      }
    } catch (error) {
      M.toast({
        html: "Failed to create account, Please contact Adminstrator.",
        classes: "red accent-2",
      });
      console.log(error);
    }
  }

  register(registrationData) {
    const thiz = this;

    AuthService.register(registrationData).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "Registration Failed: Please contact system adminstrator.",
          classes: "red accent-2",
        });
        this.setState({
          message: "Oopss Registation Failed. Contact admin",
          loading: false,
        });
      } else if (response.success === false) {
        M.toast({
          html: response.message,
          classes: "red accent-2",
        });

        this.setState({
          message: response.message,
          loading: false,
        });
      } else {
        this.setState({
          message: "Preparing your content...",
        });
        setTimeout(
          function () {
            console.log(response.accountid);
            thiz.subscribe(response.accountid);
          }.bind(this),
          3000
        );
      }
    });
  }

  subscribe(userid) {
    const thiz = this;
    console.log(userid);
    var subscriptionData = {
      studentid: userid,
      subscriptionid: this.state.subscriptionDetails.subscriptionId,
    };

    AdminService.subcribe_student(subscriptionData).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "Subscription Failed. Please contact system adminstrator.",
          classes: "red accent-2",
        });
        this.setState({
          message: "Subscription Failed. Please contact system adminstrator.",
          loading: false,
        });
      } else if (response.success === false) {
        M.toast({
          html: response.message,
          classes: "red accent-2",
        });
        this.setState({
          message: response.message,
          loading: false,
        });
      } else {
        this.setState({
          message: "Adding resources to your account...",
        });
        setTimeout(
          function () {
            thiz.enrol(userid);
          }.bind(this),
          1000
        );
      }
    });
  }

  enrol(userid) {
    var count = 0;
    for (let i = 0; i < this.state.enrolmentDetails.length; i++) {
      var enrolData = {
        studentid: userid,
        classid: this.state.enrolmentDetails[i].classId,
      };
      AdminService.self_enrolment(enrolData).then((response) => {
        if (response === undefined) {
          M.toast({
            html: "Enrolment Failed. Please contact system adminstrator.",
            classes: "red accent-2",
          });
          this.setState({
            message: "Enrolment Failed. Please contact system adminstrator.",
            loading: false,
          });
        } else if (response.success === false) {
          M.toast({
            html: response.message,
            classes: "red accent-2",
          });
          this.setState({
            message: response.message,
            loading: false,
          });
        } else {
          if (i + 1 === this.state.enrolmentDetails.length) {
            count += 1;
            M.toast({
              html: "Registration successfull",
              classes: "green accent-3",
            });

            this.setState({
              message: "Account set!",
              proceed: true,
            });
          } else {
            count += 1;
            this.setState({
              message: `Adding resources ( ${count} of ${this.state.enrolmentDetails.length} )...`,
            });

            setTimeout(function () {}, 3000);
          }
        }
      });
    }
  }

  render() {
    return (
      <div>
        <OuterHeader></OuterHeader>
        <div className="content-pawa">
          <div className="form-2" style={{ marginBottom: "-50px" }}>
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

                <div className="col s12 m5">
                  <div className="row mt-1">
                    <div className="form-group">
                      <p
                        style={{
                          marginTop: "100px",
                          color: "#2196F3",
                          textAlign: "center",
                          fontSize: "20px",
                        }}
                      >
                        {this.state.message}
                      </p>
                      {this.state.proceed ? (
                        <Link
                          className="btn-solid-lg"
                          rel="noopener noreferrer"
                          to="/login"
                          style={{
                            marginLeft: "35%",
                            marginTop: "100px",
                            marginRight: "35%",
                          }}
                        >
                          Login
                        </Link>
                      ) : (
                        <div
                          style={{ marginTop: "200px" }}
                          className="loader-3 center"
                        >
                          <span></span>
                        </div>
                      )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterSuccessScreen);
