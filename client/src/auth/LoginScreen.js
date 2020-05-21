import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import bg_img from "../assets/images/details-1-office-worker.svg";
// import bg_img from "../assets/images/details-lightbox-1.svg";
import { Redirect } from "react-router";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";

export class LoginScreen extends Component {
  
  salutations = "Good day"
  today = new Date();
  curHr = this.today.getHours();

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleLogin.bind(this);
    if (this.curHr < 12) {
      this.salutations = "Good Morning";
    } else if (this.curHr < 18) {
      this.salutations = "Good Afternoon";
    } else {
      this.salutations = "Good Evening";
    }
  }


  
  handleLogin = () => {
    const username = $("#username").val();
    const password = $("#password").val();
    this.setState({
      username,
      password,
    });
  };
  render() {
    if (this.state.username === "teacher") {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/teacher" />;
    }
    if (this.state.username === "admin") {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/admin" />;
    }
    if (this.state.username === "student") {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/student" />;
    }
    return (
      <main id="main_1">
        <OuterHeader></OuterHeader>
        <div className="container content-pawa" style={{ paddingTop: "2%" }}>
          <div className="row">
            <div className="col s8 offset-s2">
              <div className="card card-login row mt-1" style={{padding:"10px",}}>

              <div class="col s12 m5">
                  <div class="image-container" style={{paddingTop:"90px"}}>
                      <img class="img-fluid" src={bg_img} alt="alternative"/>
                  </div>
                </div> 

                <div class="col s12 m7">
                <div className="card-content">
                  <span className="card-title ex-basic-1">{this.salutations}</span>
                  <form>
                    <div className="input-field">
                      <input id="username" type="text" className="validate" />
                      <label htmlFor="username">Username*</label>
                    </div>
                    <div className="input-field">
                      <input
                        id="password"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="password">Password*</label>
                    </div>

                    <div class="form-group" style={{marginTop:"30px"}}>
                        <button type="submit" class="form-control-submit-button" onClick={this.handleLogin}>LOGIN</button>
                    </div>
                    <div class="form-group" style={{marginTop:"10px", textAlign:"center"}}>
                        <a href="#">Forgot Password</a>
                    </div>
                    <div class="form-group" style={{textAlign:"center",fontStyle:"italic"}}>
                        <a href="/register">Don't have account? Register Now</a>
                    </div>
                  </form>
                </div>
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
