import React, { Component } from "react";
import { connect } from "react-redux";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";
import { Link } from "react-router-dom";

class RegisterAs extends Component {
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
                      paddingLeft: "70px",
                      paddingRight: "70px",
                      paddingTop: "90px",
                    }}
                  >
                    <img className="img-fluid" src={img} alt="alternative" />
                  </div>
                </div>
                <div className="col s12 m7">
                  <div className="col s12 m12 ">
                    <div className="ex-basic-1">
                      <h5>Create A New Account</h5>
                    </div>
                    <div className="choices">
                      <div className="optioncircle gradient-45deg-light-blue-cyan">
                        <Link to="try-free-student-account">
                          <p>
                            <b style={{ fontSize: "24px" }}>Student</b>
                            <br /> <hr />
                            Register account as a Student
                          </p>
                        </Link>
                      </div>
                      <div className="optioncircle gradient-45deg-light-blue-cyan">
                        <Link to="try-free-teacher-account">
                          <p>
                            <b style={{ fontSize: "24px" }}>Teacher</b>
                            <br /> <hr />
                            Register account as a Teacher
                          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAs);
