import React, { Component } from "react";
import { connect } from "react-redux";
// import bg_img from "../assets/images/details-1-office-worker.svg";
// import bg_img from "../assets/images/details-lightbox-1.svg";

import headerImg from "../assets/images/wall.png";
import { Redirect } from "react-router";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import { Link } from "react-router-dom";
import {AuthService} from '../services/authServices';

export class LoginScreen extends Component {
  
  salutations = "Good day"
  today = new Date();
  curHr = this.today.getHours();

  constructor() {
    super();
    this.state = {
      username: "",
      userid:"",
      schoolid:"",
      roleid:""
    };

    if (this.curHr < 12) {
      this.salutations = "Good Morning";
    } else if (this.curHr < 18) {
      this.salutations = "Good Afternoon";
    } else {
      this.salutations = "Good Evening";
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var registerAdmin = {
        email: event.target.username.value,
        password:  event.target.password.value,           
    }

    AuthService.login(registerAdmin).then((response) => {
      

      //remove
      const roleid = 3;
      const username =  "Kelvin";
      const userid = "655";
      const schoolid= "1";
      this.setState({
        roleid,
        username,
        userid,
        schoolid
      });



        if (response === undefined) {
            alert("Login Failed")
        } else if (response.success === false) {
            alert(response.message);
        } else {
            document.getElementById("contactForm").reset();
            var id;
            if (response.roleid === 3) {
              id = response.User.studentId;
            } else if (response.roleid === 1) {
              id = response.User.teacherId;
            } else if (response.roleid === 5) {
              id = response.User.SystemAdminId;
            }else if (response.roleid === 4) {
              id = response.User.saId;
            } else {
              id = response.User.parentId;
            }

            const roleid = response.roleid;
            const username =  response.User.firstname + ' ' + response.User.lastname;
            const userid = id;
            const schoolid= response.User.schoolid;

            
            this.setState({
              roleid,
              username,
              userid,
              schoolid
            });
        }
    });
}
  

  render() {
    if (this.state.roleid === 1) {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/teacher" />;
    }
    if (this.state.roleid === 5) {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/admin" />;
    }
    if (this.state.roleid === 3) {
      localStorage.setItem("user", JSON.stringify(this.state));
      return <Redirect to="/student" />;
    }
    if (this.state.roleid === 4) {
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
                      <img className="img-fluid" src={headerImg} alt="alternative"/>
                  </div>
                </div> 

                <div className="col s12 m7">
                <div className="card-content">
                  <span className="card-title ex-basic-1">{this.salutations}</span>
                  <form id="contactForm" onSubmit={this.handleSubmit} >
                    <div className="input-field">
                      <input id="username" type="email" className="validate" name="username"/>
                      <label htmlFor="username">Email *</label>
                    </div>
                    <div className="input-field">
                      <input
                        id="password"
                        type="password"
                        className="validate"
                        name="password"
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
