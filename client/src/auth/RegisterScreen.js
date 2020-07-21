import React, { Component } from 'react'
import { connect } from 'react-redux'
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-2-office-team-work.svg"

import RegistrationForm from '../components/student-components/RegistrationForms';

class RegisterScreen extends Component {

    

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
                                    <RegistrationForm></RegistrationForm>
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
