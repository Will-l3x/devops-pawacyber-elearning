import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import bg_img from "../assets/images/details-1-office-worker.svg";
// import bg_img from "../assets/images/details-lightbox-1.svg";
import { Redirect } from "react-router";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import { Link } from "react-router-dom";

export class LoginScreen extends Component {
  
  salutations = "Good day"
  today = new Date();
  curHr = this.today.getHours();

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      userid:"",
      schoolid:""
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
    const userid = 1;
    const schoolid= 2;
    
    this.setState({
      username,
      password,
      userid,
      schoolid
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
    if (this.state.username === "school") {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/school" />;
    }
    return (
      <main id="main_1">
        <OuterHeader></OuterHeader>
        <div className="container content-pawa" style={{ paddingTop: "2%" }}>
          <div className="row">
            <div className="col s8 offset-s2">
              <div className="card card-login row mt-1" style={{padding:"10px",}}>

              <div className="col s12 m5">
                  <div className="image-container" style={{paddingTop:"90px"}}>
                      <img className="img-fluid" src={bg_img} alt="alternative"/>
                  </div>
                </div> 

                <div className="col s12 m7">
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

                    <div className="form-group" style={{marginTop:"30px"}}>
                        <button type="submit" className="form-control-submit-button" onClick={this.handleLogin}>LOGIN</button>
                    </div>
                    <div className="form-group" style={{marginTop:"10px", textAlign:"center"}}>
                        <Link to="#">Forgot Password</Link>
                    </div>
                    <div className="form-group" style={{textAlign:"center",fontStyle:"italic"}}>
                        <Link to="/register">Don't have account? Register Now</Link>
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
