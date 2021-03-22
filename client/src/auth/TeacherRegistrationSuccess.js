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

class TeacherRegisterSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationDetails: null,
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
      const registrationDetails = await AsyncStorage.getItem("teacherRegData");
      const paymentdetails = await AsyncStorage.getItem("paymentDetails");
      if (registrationDetails !== null && paymentdetails !== null) {
        this.setState({
          registrationDetails: JSON.parse(registrationDetails),
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
        M.toast({
          html: "Registration successfull",
          classes: "green accent-3",
        });

        this.setState({
          message: "Account set!",
          proceed: true,
        });
      }
    });
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
)(TeacherRegisterSuccessScreen);
