import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Link } from "react-router-dom";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-2-office-team-work.svg"


export class RegisterScreen extends Component {
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
                                <form id="contactForm" data-toggle="validator" data-focus="false" novalidate="true">
                                    <div class="row mt-1">
                                        <div class="col s12 m5">  
                                            <div className="input-field">
                                                <input id="surname" type="text" className="validate" />
                                                <label htmlFor="surname">Surname *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m4">     
                                            <div className="input-field">
                                                <input id="name" type="text" className="validate"/>
                                                <label htmlFor="name">Name *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m3">     
                                            <div className="input-field">
                                                <input id="gender" type="text" className="validate"/>
                                                <label htmlFor="gender">Gender *</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row mt-1">
                                        <div class="col s12 m6">     
                                            <div className="input-field">
                                                <input id="school" type="text" className="validate"/>
                                                <label htmlFor="school">Select School *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m6">  
                                            <div className="input-field">
                                                <input id="grade" type="text" className="validate" />
                                                <label htmlFor="grade">Select Grade *</label>
                                            </div>
                                        </div>
                                    </div>
                                                                        
                                    <div class="row mt-1">
                                        <div class="col s12 m7">  
                                            <div className="input-field">
                                                <input id="phoneNumber" type="number" className="validate" />
                                                <label htmlFor="phoneNumber">Phone Number *</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-1">
                                        <div class="col s12 m4">  
                                            <div className="input-field">
                                                <input id="username" type="text" className="validate" />
                                                <label htmlFor="username">Username *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m4">  
                                            <div className="input-field">
                                                <input id="password" type="password" className="validate" />
                                                <label htmlFor="password">Password *</label>
                                            </div>
                                        </div>
                                        <div class="col s12 m4">     
                                            <div className="input-field">
                                                <input id="repassword" type="password" className="validate"/>
                                                <label htmlFor="repassword">Retype Password *</label>
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
