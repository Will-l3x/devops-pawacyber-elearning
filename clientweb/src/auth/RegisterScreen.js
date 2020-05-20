import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
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
                <div class="form-2">
                    <div class="container">
                        <div class="row mt-1">
                            <div class="col s12 m6">
                            <div class="image-container">
                        <img class="img-fluid" src={img} alt="alternative"/>
                    </div>
                            </div> 
                            <div class="col s12 m6">                    
                                <form id="contactForm" data-toggle="validator" data-focus="false" novalidate="true"
                                >
                                     <div class="row mt-1">
                            <div class="col s12 m6">  <div class="form-group">
                                        <input type="text" class="form-control-input" id="cname" required=""/>
                                        <label class="label-control" for="cname">Surname</label>
                                        <div class="help-block with-errors"></div>
                                    </div></div>
                            <div class="col s12 m6">     <div class="form-group">
                                        <input type="text" class="form-control-input" id="cname" required=""/>
                                        <label class="label-control" for="cname">Name</label>
                                        <div class="help-block with-errors"></div>
                                    </div></div></div>
                                  
                               
                                    <div class="form-group">
                                        <input type="email" class="form-control-input" id="cemail" required=""/>
                                        <label class="label-control" for="cemail">Email</label>
                                        <div class="help-block with-errors"></div>
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
