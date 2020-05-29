import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Link } from "react-router-dom";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-2-office-team-work.svg"
import {AuthService} from '../services/authServices';
import { Redirect } from "react-router-dom";
import M from "materialize-css";

export class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"Mr"
        };
        this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
      }

      componentDidMount() {
        M.AutoInit();
      }
    
    handleTitleDropdownChange(event) {
        this.setState({title: event.target.value });
      }

      

      handleSubmit = (event) => {
        event.preventDefault();

        var registerAdmin = {
            roleid: 3,
            email: event.target.email.value,
            password:  event.target.password.value,
            grade: event.target.grade.value,
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            title: this.state.title,
            vpassword:  event.target.vpassword.value,
            dob: event.target.dob.value             
        }

        AuthService.register(registerAdmin).then((response) => {
            if (response === undefined) {
                alert("Registration Failed")
            } else if (response.success === false) {
                alert(response.message);
            } else {
                alert(response.message);
                document.getElementById("contactForm").reset();
                return <Redirect to="/login"/>;
            }
        });
    }

    render() {
        return (
            <div>
                <OuterHeader></OuterHeader>
                    <div className="content-pawa" >
                        <div className="ex-basic-1">
                            <h4>CREATE A STUDENT ACCOUNT</h4>
                        </div>
                <div className="form-2" style={{marginBottom:"-50px"}}>
                    <div className="container" style={{marginTop:"-100px"}}>
                        <div className="row mt-1" >
                            <div className="col s12 m5">
                                <div className="image-container" style={{paddingLeft:"70px",paddingRight:"70px",paddingTop:"90px"}}>
                                    <img className="img-fluid" src={img} alt="alternative"/>
                                </div>
                            </div> 
                            <div className="col s12 m7">                    
                                <form id="contactForm" data-toggle="validator" data-focus="false" onSubmit={this.handleSubmit}>
                                    <div className="row mt-1">
                                    <div className="col s12 m3">     
                                     <div className="input-field">
                                            <select name="title" defaultValue={this.state.title}  onChange={this.handleTitleDropdownChange} required>                              
                                                <option value="Mr">Male</option> 
                                                <option value="Miss">Female</option> 
                                            </select>
                                            <label htmlFor="title">Gender* </label>
                                        </div>
                                        </div>

 
                                        <div className="col s12 m5">  
                                            <div className="input-field">
                                                <input id="lastname" type="text" className="validate" name="lastname" required ></input>
                                                <label htmlFor="lastname">Surname *</label>
                                            </div>
                                        </div>
                                        <div className="col s12 m4">     
                                            <div className="input-field">
                                                <input id="firstname" type="text" className="validate" name="firstname" required></input>
                                                <label htmlFor="firstname">First Name *</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row mt-1">
                                        <div className="col s12 m6">     
                                            <div className="input-field">
                                                <input id="dob" type="date" className="validate" name="dob"required/>
                                                <label htmlFor="dob">Date of Birth *</label>
                                            </div>
                                        </div>
                                        <div className="col s12 m6">  
                                            <div className="input-field">
                                                <input id="grade" type="number" className="validate" name="grade" required></input>
                                                <label htmlFor="grade">Select Grade *</label>
                                            </div>
                                        </div>
                                    </div>
                                                                        
                                    <div className="row mt-1">
                                        <div className="col s12 m4">  
                                            <div className="input-field">
                                                <input id="email" type="email" className="validate" name="email" required ></input>
                                                <label htmlFor="email">Email *</label>
                                            </div>
                                        </div>
                                        <div className="col s12 m4">  
                                            <div className="input-field">
                                                <input id="password" type="password" className="validate" name="password" required ></input>
                                                <label htmlFor="password">Password *</label>
                                            </div>
                                        </div>
                                        <div className="col s12 m4">     
                                            <div className="input-field">
                                                <input id="vpassword" type="password" className="validate" name="vpassword" required ></input>
                                                <label htmlFor="vpassword">Retype Password *</label>
                                            </div>
                                        </div>
                                    </div>
                               
                                    <div className="form-group">
                                        <button type="submit" className="form-control-submit-button disabled">REGISTER NOW</button>
                                    </div>
                                    <div className="form-message">
                                        <div id="cmsgSubmit" className="h3 text-center hidden"></div>
                                    </div>
                                </form>
                            </div> 
                        </div> 
                    </div> 
                </div>
                <OuterFooter></OuterFooter>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
