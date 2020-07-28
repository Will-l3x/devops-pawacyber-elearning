import React, { Component } from "react";
import avatar from "../../assets/images/icon/book_lover.png";
import M from "materialize-css";
import PackageOptions from "./PackageOption";
import ClassOptions from "./ClassesOptions";
import { PaymentService } from "../../services/paymentService";

export default class StudyMaterialCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubscribe: false,
      selectedOption: null,
      grade: null,
      redirect: false,
      proceedToPay: false,
      loading: false,
      numberOfsubs: 0,
      selectedsubs: [],
      message: ""
    };

    this.handleGradeDropdownChange = this.handleGradeDropdownChange.bind(this);
  }

  handleGradeDropdownChange(event) {
    this.setState({ grade: event.target.value });
    localStorage.removeItem("registrationData");
    localStorage.setItem("registrationData", JSON.stringify({ gradeid: this.state.grade }));
  }

  user = {};
  userAll = {};

  componentDidMount() {
    M.AutoInit();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userAll = JSON.parse(localStorage.getItem("userAll"));
    this.setState({grade:this.userAll.gradeid});
    console.log(this.user)
 
  }

  handlePayment = (event) => {
    event.preventDefault();
    this.setState({ loading: true });


    localStorage.setItem("selectedPackage", JSON.stringify(this.state.selectedOption));
    localStorage.setItem("selectedSubjects", JSON.stringify(this.state.selectedsubs));


    var paymentDetails = {
      paymentAmount: parseFloat(this.state.selectedOption.price),
      customerEmail: this.user.email,
      customerFirstName: this.userAll.firstname,
      customerLastName: this.userAll.lastname,
      serviceDescription: this.state.selectedOption.subscriptionname,
      routeSuccessLink: "https://cybers.azurewebsites.net/payment-upgrade"
    };

    PaymentService.createToken(paymentDetails).then((response) => {
      if (response === undefined) {
        M.toast({
          html: "Payment Failed",
          classes: "red accent-2",
        });
      } else if (response.success === false) {
     
        M.toast({
          html: response.message,
          classes: "red",
        });
      } else {
        M.toast({
          html: "You are being redirected to the payment page",
          classes: "green",
        });
        // window.open(`https://secure1.sandbox.directpay.online/payv2.php?ID=${response.data.transactionToken}`,'_blank');
        document.getElementById("contact").reset();
        this.setState({ redirect: true });
        window.location.href = `https://secure1.sandbox.directpay.online/payv2.php?ID=${response.data.transactionToken}`;
      }
    });
  };

  remove(element) {
    const index = this.state.selectedsubs.indexOf(element);
    this.state.selectedsubs.splice(index, 1);
  }

  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );

    this.setState({
      numberOfsubs: selectedOption.subjects,
      loading: false
    });
  };

  onSelectClassOption = (selectedOption) => {
    if (this.state.selectedsubs.length === this.state.numberOfsubs) {
      this.setState({
        message: "You have selected the maximum number of subjects for you package"
      })
    } else {
      if (this.state.selectedsubs.includes(selectedOption)) {
        this.setState({
          message: "Suject Already Selected"
        });
      } else {
        var valSubs = this.state.selectedsubs.concat(selectedOption);
        this.setState({
          selectedsubs: valSubs,
          message: ""
        });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="row card border-radius-7">
          <div
            className="col s2 "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={avatar}
              alt="Avatar"
              style={{ flexShrink: "0", maxWidth: "100%", maxHeight: "80px" }}
            ></img>
          </div>
          <div className="col s6 card-title">
            <div
              className=""
              style={{
                fontSize: "16px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Anytime is study time! Enrol for as many classes as you can to
              enjoy the full benefits of elearning
            </div>
          </div>

          <div
            className="col s4"
            style={{ paddingTop: "1.4%", paddingBottom: "1.3%" }}
          >
            <div
              data-target="modal1"
              className="modal-trigger tooltipped waves-effect right right-align"
              data-tooltip="Make Payment"
              data-position="bottom"
            >
              <div
                className="card btn border-radius-5"
                // style={{ maxWidth: "150px" }}
                style={{ fontSize: "14px", marginBottom: '10px' }}
              >
                Enrol for more subjects
              </div>
            </div>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <div className="col s12 m10">
              <div className="ex-basic-1">
                <h4 className="header2">Add Subjects</h4>
              </div>
              <form id="contact" data-toggle="validator" data-focus="false" onSubmit={this.handlePayment} >
                <div className="row mt-1">
                  <div className="col s12 m2">
                    <div className="input-field">
                      <select
                        name="grade"
                        defaultValue={this.state.grade}
                        onChange={this.handleGradeDropdownChange}
                        required
                      >
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
                      <label style={{ transform: "translateY(-15px)", fontSize: "12px" }}>
                        Subscription Package*
                   </label>
                      <PackageOptions onSelectOption={this.onSelectOption} required />
                      <div className="my-divider"></div>
                    </div>
                  </div>

                  <div className="col s12 m5">
                    <div className="input-field">
                      <label style={{ transform: "translateY(-15px)", fontSize: "12px" }}>
                        Subjects *
                   </label>
                      <ClassOptions onSelectOption={this.onSelectClassOption} required />
                      <div className="my-divider"></div>
                    </div>
                  </div>
                </div>
                <p style={{ textAlign: "center", color: "red" }}>{this.state.message}</p>
                <div className="row mt-1">
                  {this.state.selectedsubs.map((sub, i) => (
                    <div className="col" style={{ marginBottom: "20px" }}>
                      <span key={i} style={{ border: "solid", padding: "5px", borderRadius: "10px", borderColor: "#2196F3", textAlign: 'center' }}>{sub.classname}</span>
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  {
                    !this.state.loading ? <button type="submit" className="form-control-submit-button" >
                      Make Payment
                </button> : <div class="loader-3 center"><span></span></div>
                  }
                </div>
              </form>
            </div >
          </div>
        </div>
      </div>
    );
  }
}
