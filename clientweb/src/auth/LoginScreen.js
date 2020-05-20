import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import bg_img from "../assets/images/login_bg.jpg";
import { Redirect } from "react-router";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";

export class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleLogin.bind(this);
  }
  handleLogin = () => {
    const username = $("#username").val();
    const password = $("#password").val();
    this.setState(
      {
        username,
        password
      }
    )
  };
  render() {
    if (this.state.username === "teacher") {
      return <Redirect to="/teacher" />;
    }
    if (this.state.username === "admin") {
      return <Redirect to="/admin" />;
    }
    if (this.state.username === "student") {
      return <Redirect to="/student" />;
    }
    return (
      <main id="main_1">
        <OuterHeader></OuterHeader>
        <div className="container content-pawa" style={{ paddingTop: "10%" }}>
          <div className="row">
            <div className="col s8 offset-s2">
              <div className="card card-login">
                <div className="card-login-splash">
                  <div className="wrapper">
                    <h3 className="white-text">Account</h3>

                    <a
                      className="btn gradient-45deg-light-blue-cyan"
                      rel="noopener noreferrer"
                      href="#!"
                    >
                      Sign In
                    </a>
                    <a
                      className="btn gradient-45deg-light-blue-cyan"
                      rel="noopener noreferrer"
                      href="#!"
                    >
                      Register
                    </a>
                  </div>

                  <img src={bg_img} alt="" />
                </div>
                <div className="card-content">
                  <span className="card-title">Log In</span>
                  <form>
                    <div className="input-field">
                      <input id="username" type="text" className="validate" />
                      <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                      <input
                        id="password"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    <a rel="noopener noreferrer" href="#!">
                      Forgot Password?
                    </a>

                    <br />
                    <br />
                    <div>
                      <a
                        onClick={this.handleLogin}
                        rel="noopener noreferrer"
                        href="#!"
                        className="btn right gradient-45deg-light-blue-cyan"
                      >
                        Log In
                      </a>
                      <a
                        rel="noopener noreferrer"
                        href="#!"
                        className="btn-flat"
                      >
                        Back
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <OuterFooter></OuterFooter>
        </div>
       
      </main>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
