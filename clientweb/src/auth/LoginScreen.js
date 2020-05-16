import React, { Component } from "react";
import { connect } from "react-redux";

import bg_img from "../assets/images/login_bg.jpg";

export class LoginScreen extends Component {
  render() {
    return (
      <main id="main_1">
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <div className="card card-login">
                <div className="card-login-splash">
                  <div className="wrapper">
                    <h3>Account</h3>

                    <a className="btn" rel="noopener noreferrer" href="#!">
                      Sign In
                    </a>
                    <a className="btn" rel="noopener noreferrer" href="#!">
                      Register
                    </a>
                  </div>

                  <img
                    src={bg_img}
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <span className="card-title">Log In</span>
                  <form>
                    <div className="input-field">
                      <input id="username" type="text" className="validate" />
                      <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                      <input id="password" type="password" className="validate" />
                      <label htmlFor="password">Password</label>
                    </div>

                    <a rel="noopener noreferrer" href="#!">Forgot Password?</a>

                    <br />
                    <br />
                    <div>
                      <input className="btn right" type="submit" value="Log In" />
                      <a rel="noopener noreferrer" href="#!" className="btn-flat">
                        Back
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
