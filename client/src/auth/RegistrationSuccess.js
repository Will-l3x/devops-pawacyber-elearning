import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-2-office-team-work.svg"
import { AdminService } from '../services/admin';
import { AuthService } from '../services/authServices';
import { HashLink as Link } from "react-router-hash-link";

class RegisterSuccessScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registrationDetails: null,
            subscriptionDetails: null,
            enrolmentDetails: null,
            paymentdetails: null,
            proceed: false,
            message: "Completing the registration..."
        };
    }

    componentDidMount() {
        M.AutoInit();
        M.toast({
            html: "Payment Successful",
            classes: "green accent-3",
        });
        this.getLocalStorageData();

    }

    getLocalStorageData() {
        this.setState({
            registrationDetails: JSON.parse(localStorage.getItem("registrationData")),
            subscriptionDetails: JSON.parse(localStorage.getItem("selectedPackage")),
            enrolmentDetails: JSON.parse(localStorage.getItem("selectedSubjects")),
            paymentdetails: JSON.parse(localStorage.getItem("paymentDetails"))
        });

        setTimeout(function () {
            console.log(this.state.registrationDetails);
            console.log(this.state.subscriptionDetails);
            console.log(this.state.enrolmentDetails);
            this.register();
        }.bind(this), 1000);


    }

    register() {
        AuthService.register(this.state.registrationDetails).then((response) => {
            if (response === undefined) {
                M.toast({
                    html: "Registration Failed: Please contact system adminstrator.",
                    classes: "red accent-2",
                });
                this.setState({
                    message: "Oopss Registation Failed. Contact admin"
                });
            } else if (response.success === false) {
                M.toast({
                    html: response.message,
                    classes: "red accent-2",
                });

                this.setState({
                    message: response.message
                });
            } else {
                this.setState({
                    message: "Preparing your content..."
                });
                setTimeout(function () {
                    this.subscribe();
                }.bind(this), 3000);
            }
        });
    }

    subscribe() {
        var subscriptionData = {
            studentid: 223,
            subscriptionid: this.state.subscriptionDetails.subscriptionId
        };

        AdminService.subcribe_student(subscriptionData).then((response) => {
            if (response === undefined) {
                M.toast({
                    html: "Subscription Failed. Please contact system adminstrator.",
                    classes: "red accent-2",
                });
            } else if (response.success === false) {

                M.toast({
                    html: response.message,
                    classes: "red accent-2",
                });
            } else {
                this.setState({
                    message: "Adding resources to your account..."
                });
                setTimeout(function () {
                    this.enrol();
                }.bind(this), 1000);
            }
        });
    }

    enrol() {
        var count = 0;

        for (let i = 0; i < this.state.enrolmentDetails.length; i++) {
         
            var enrolData = {
                studentid: 223,
                classid: this.state.enrolmentDetails[i].classId,
            }
            AdminService.self_enrolment(enrolData).then((response) => {
                if (response === undefined) {
                    M.toast({
                        html: "Enrolment Failed. Please contact system adminstrator.",
                        classes: "red accent-2",
                    });
                } else if (response.success === false) {
                  
                    M.toast({
                        html: response.message,
                        classes: "red accent-2",
                    });
                } else {
                    if ((i + 1) === this.state.enrolmentDetails.length) {
                        M.toast({
                            html: "Registration successfull",
                            classes: "green accent-3",
                        });

                        this.setState({
                            message: "Account set!",
                            proceed: true
                        });
                    } else {
                        this.setState({
                            message: `Adding resources ( ${count} of ${this.state.enrolmentDetails.length} )...`,
                        });

                        setTimeout(function () { }, 3000);
                    }
                }
            });
        }
    }

    render() {
        return (
            <div>
                <OuterHeader></OuterHeader>
                <div className="content-pawa" >

                    <div className="form-2" style={{ marginBottom: "-50px" }}>
                        <div className="container" style={{ marginTop: "-100px" }}>
                            <div className="row mt-1" >
                                <div className="col s12 m5">
                                    <div className="image-container" style={{ paddingLeft: "70px", paddingRight: "70px", paddingTop: "90px" }}>
                                        <img className="img-fluid" src={img} alt="alternative" />
                                    </div>
                                </div>

                                <div className="col s12 m5">
                                    <div className="row mt-1" >
                                        <div className="form-group">
                                            <p style={{ marginTop: "100px", color: "#2196F3", textAlign: 'center', fontSize: '20px' }}>{this.state.message}</p>
                                            {
                                                this.state.proceed ?
                                                        <Link className="btn-solid-lg" rel="noopener noreferrer" to="/login" style={{marginLeft:"35%",marginTop: "100px", marginRight:"35%"}}>
                                                            Get Started - Login 
                                                        </Link>
                                                    :
                                                    <div style={{marginTop: "200px",}}class="loader-3 center"><span></span></div>
                                            }
                                        </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccessScreen)
