import React, { Component } from 'react'
import { connect } from 'react-redux'
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-2-office-team-work.svg"
import { AdminService } from '../services/admin';

class RegisterSuccessScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registrationDetails: null,
            subscriptionDetails: null,
            enrolmentDetails: null,
            paymentdetails: null,
            proceed: false,
            message: "Completing Registration..."
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
        this.register();
    }

    register() {
        AuthService.register(this.state.registrationDetails).then((response) => {
            if (response === undefined) {
                M.toast({
                    html: "Registration Failed: Please contact system adminstrator.",
                    classes: "red accent-2",
                });
            } else if (response.success === false) {
                alert(response.message);
                M.toast({
                    html: "Registration Failed. Please contact system adminstrator.",
                    classes: "red accent-2",
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
                alert(response.message);
                M.toast({
                    html: "Failed to subscribe for the paid package. Please contact system adminstrator.",
                    classes: "red accent-2",
                });
            } else {
                this.setState({
                    message: "Adding resources to your account..."
                });
                setTimeout(function () { 
                    this.enrol();
                }.bind(this), 3000);
            }
        });
    }

    enrol() {
        var count = 0;
        this.state.enrolmentDetails.forEach(element => {
            alert(element.classId);
            var enrolData = {
                studentid: 223,
                classid: element.classId,
            }
            AdminService.self_enrolment(enrolData).then((response) => {
                if (response === undefined) {
                    M.toast({
                        html: "Enrolment Failed. Please contact system adminstrator.",
                        classes: "red accent-2",
                    });
                } else if (response.success === false) {
                    alert(response.message);
                    M.toast({
                        html: "Enrolment Failed. Please contact system adminstrator.",
                        classes: "red accent-2",
                    });
                } else {
                    if (count == this.state.enrolmentDetails.length) {
                        M.toast({
                            html: "Registration successfull",
                            classes: "green accent-3",
                        });
                        count = count + 1;
                        this.setState({
                            message: "Account set!",
                            proceed: true
                        });
                    } else {
                        this.setState({
                            message: `Adding resources ( ${count} of ${this.state.enrolmentDetails.length} )...`,
                        });
                        count = count + 1;
                        setTimeout(function () { }.bind(this), 3000);
                    }
                }
            });
        });
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
                                <div className="col s12 m7">
                                    <span style={{ padding: "5px", color: "#2196F3", textAlign: 'center' }}>{this.state.message}</span>
                                    {
                                        this.state.proceed ?
                                            (
                                                <div>
                                                    <h5>Login Now</h5>
                                                </div>
                                            ) :
                                            (
                                                <div></div>
                                            )
                                    }
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
