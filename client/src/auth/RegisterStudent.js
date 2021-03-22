import React, { Component } from 'react'
import { connect } from 'react-redux'
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";
import { Link } from "react-router-dom";

import FreeRegister from "../components/student-components/FreeStudent";
import RegisterScreen from "./RegisterScreen";

class RegisterStudent extends Component {

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
            independentStudent: indepent
        })
    };

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
                        <img
                          className="img-fluid"
                          src={img}
                          alt="alternative"
                        />
                      </div>
                    </div>
                    <div className="col s12 m7">
                      {this.state.pendingSelection ? (
                        <div className="col s12 m12 ">
                          <div className="ex-basic-1">
                            <h5>Try Out Our Free Subscription Accounts?</h5>
                          </div>
                          <div className="choices">
                            <div
                              onClick={() => this.selectOption(false)}
                              className="optioncircle gradient-45deg-light-blue-cyan"
                            >
                              <p>
                                <b style={{ fontSize: "24px" }}>YES</b>
                                <br /> <hr />
                                Register Trial Account
                              </p>
                            </div>
                            <div className="optioncircle gradient-45deg-light-blue-cyan">
                              <Link to="/register-premium-student">
                                <p>
                                  <b style={{ fontSize: "24px" }}>NO</b>
                                  <br /> <hr />
                                  Register Premium Account
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : !this.state.independentStudent ? (
                        <FreeRegister></FreeRegister>
                      ) : (
                        <RegisterScreen></RegisterScreen>
                      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStudent)
