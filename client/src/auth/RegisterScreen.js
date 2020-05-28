import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Link } from "react-router-dom";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-2-office-team-work.svg"
import {AuthService} from '../services/authServices';

export class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:""
        };
        this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
      }
    

    handleTitleDropdownChange(event) {
        this.setState({title: event.target.value });
      }

      handleSubmit = (event) => {
        event.preventDefault();

        var registerAdmin = {
            email: event.target.email.value,
            password:  event.target.password.value,
            vpassword:  event.target.vpassword.value,
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            title: this.state.title,
            grade: event.target.grade.value,
            roleId: 'student',
        }

        AuthService.register(registerAdmin).then((response) => {
            if (response === undefined) {
                alert("Registration Failed")
            } else if (response.success === false) {
                alert(response.message);
            } else {
                alert(response.message);
                document.getElementById("contactForm").reset();
                this.getDashData();
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
                <div class="form-2" style={{marginBottom:"-50px"}}>
                    <div class="container" style={{marginTop:"-100px"}}>
                        <div class="row mt-1" >
                            <div class="col s12 m5">
                                <div class="image-container" style={{paddingLeft:"70px",paddingRight:"70px",paddingTop:"90px"}}>
                                    <img class="img-fluid" src={img} alt="alternative"/>
                                </div>
                            </div> 
                            <div class="col s12 m7">                    
                                <form id="contactForm" data-toggle="validator" data-focus="false" novalidate="true" onSubmit={this.handleSubmit}>
                                    <div class="row mt-1">
                                    <div class="col s12 m3">     
                                     <div className="input-field">
                                            <select name="title" defaultValue={this.state.title}   onChange={this.handleTitleDropdownChange} required>                              
                                                <option value="Mr">Mr</option> 
                                                <option value="Mr">Mrs</option> 
                                                <option value="Mr">Rev</option> 
                                                <option value="Mr">Dr</option> 
                                            </select>
                                        </div>
                                        </div>

                                        <div class="col s12 m4">     
                                            <div className="input-field">
                                                <input id="firstname" type="text" className="validate" name="firstname" required/>
                                                <label htmlFor="firstname">First Name *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m5">  
                                            <div className="input-field">
                                                <input id="lastname" type="text" className="validate" name="lastname" required />
                                                <label htmlFor="lastname">Surname *</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row mt-1">
                                        <div class="col s12 m6">     
                                            <div className="input-field">
                                                <input id="school" type="text" className="validate" name="school"required/>
                                                <label htmlFor="school">School ID *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m6">  
                                            <div className="input-field">
                                                <input id="grade" type="text" className="validate" name="grade" required/>
                                                <label htmlFor="grade">Select Grade *</label>
                                            </div>
                                        </div>
                                    </div>
                                                                        
                                    <div class="row mt-1">
                                        <div class="col s12 m4">  
                                            <div className="input-field">
                                                <input id="email" type="email" className="validate" name="email" required />
                                                <label htmlFor="email">Email *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m4">  
                                            <div className="input-field">
                                                <input id="password" type="password" className="validate" name="password" required />
                                                <label htmlFor="password">Password *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m4">     
                                            <div className="input-field">
                                                <input id="vpassword" type="password" className="validate" name="vpassword" required />
                                                <label htmlFor="vpassword">Retype Password *</label>
                                            </div>
                                        </div>
                                    </div>
                               
                                    <div class="form-group">
                                        <button type="submit" class="form-control-submit-button disabled">REGISTER NOW</button>
                                    </div>
                                    <div class="form-message">
                                        <div id="cmsgSubmit" class="h3 text-center hidden"></div>
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
