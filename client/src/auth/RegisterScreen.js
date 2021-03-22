import React, { Component } from 'react'
import { connect } from 'react-redux'
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";

import RegistrationForm from '../components/student-components/RegistrationForms';
import RegisterOnboardedSchool from '../components/student-components/RegisterOnboardedSchool';
import FreeRegister from "../components/student-components/FreeStudent";
import { HashLink as Link } from "react-router-hash-link";
import { Redirect } from "react-router-dom";

class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            independentStudent: true,
            pendingSelection: true,
            redirect: false,
        };
    }
   
    selectOption(indepent) {
        this.setState({
            pendingSelection: false,
            independentStudent: indepent 
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/register" />;
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
                            <h5>DO YOU HAVE YOUR SCHOOL CODE?</h5>
                          </div>
                          <div className="choices">
                            <div
                              onClick={() => this.selectOption(false)}
                              className="optioncircle gradient-45deg-light-blue-cyan"
                            >
                              <p>
                                <b style={{ fontSize: "24px" }}>YES</b>
                                <br /> <hr />
                                Activate Student Account
                              </p>
                            </div>
                            <div
                              onClick={() => this.selectOption(true)}
                              className="optioncircle gradient-45deg-light-blue-cyan"
                            >
                              <p>
                                <b style={{ fontSize: "24px" }}>NO</b>
                                <br /> <hr />
                                Register New Account
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : !this.state.independentStudent ? (
                        <RegisterOnboardedSchool></RegisterOnboardedSchool>
                      ) : (
                        <RegistrationForm></RegistrationForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
