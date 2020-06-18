import React, { Component } from 'react'
import {AuthService} from '../../services/authServices';
import M from "materialize-css";
import { Redirect } from "react-router-dom";

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"Mr",
            grade:"",
            gender:"1"
        };
        this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
        this.handleGradeDropdownChange = this.handleGradeDropdownChange.bind(this);
      }

    componentDidMount() {
        M.AutoInit();
    }
    
    handleTitleDropdownChange(event) {
        if(event.target.value==="1"){
            this.setState({title: "Mr" });
            this.setState({gender: event.target.value });
        }else{
            this.setState({title: "Miss" });
            this.setState({gender: event.target.value });
        }
    }

    handleGradeDropdownChange(event){
        this.setState({grade:event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var registerAdmin = {
            roleid: 3,
            email: event.target.email.value,
            password:  event.target.password.value,
            gradeid: this.state.grade,
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            title: this.state.title,
            vpassword:  event.target.vpassword.value,
            dob: event.target.dob.value,
            genderid: this.state.gender,
            schoolid: event.target.schoolId                  
        }
        
        AuthService.register(registerAdmin).then((response) => {
            if (response === undefined) {
                alert("Registration Failed");
            } else if (response.success === false) {
                alert(response.message);
            } else {
                alert(response.message);
                document.getElementById("contactForm").reset();
                return <Redirect to="/login"/>;
            }
        });
    }

    render(){
        return (
            <div className="col s12 m7">
            <form id="contactForm" data-toggle="validator" data-focus="false" onSubmit={this.handleSubmit}>
                <div className="row mt-1">
                <div className="col s12 m3">     
                 <div className="input-field">
                        <select name="gender" onChange={this.handleTitleDropdownChange} required>                              
                            <option value="1">Male</option> 
                            <option value="2">Female</option> 
                            <option value="3">Other</option> 
                        </select>
                        <label htmlFor="gender">Gender* </label>
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
                    <div className="col s12 m5">     
                        <div className="input-field">
                            <input id="dob" type="date" className="validate" name="dob"required/>
                            <label htmlFor="dob">Date of Birth *</label>
                        </div>
                    </div>
                    <div className="col s12 m2">  
                        <div className="input-field">
                        <select name="grade" defaultValue={this.state.grade}  onChange={this.handleGradeDropdownChange} required>                              
                            <option value="1">1</option> 
                            <option value="2">2</option> 
                            <option value="3">3</option> 
                            <option value="4">4</option> 
                            <option value="5">5</option> 
                            <option value="6">6</option> 
                            <option value="7">7</option> 
                            <option value="8">8</option> 
                            <option value="9">9</option> 
                            <option value="10">10</option> 
                            <option value="11">11</option> 
                            <option value="12">12</option> 
                        </select>
                            <label htmlFor="grade">Grade *</label>
                        </div>
                    </div>
                    <div className="col s12 m5">  
                        <div className="input-field">
                            <input id="schoolId" type="text" className="validate" name="schoolId" required></input>
                            <label htmlFor="schoolId">Enter School ID *</label>
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
                    <button type="submit" className="form-control-submit-button">PROCEED</button>
                </div>
                <div className="form-message">
                    <div id="cmsgSubmit" className="h3 text-center hidden"></div>
                </div>
            </form>
        </div> 

        );
}};