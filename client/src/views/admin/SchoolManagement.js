import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {AdminService} from '../../services/admin';

export class SchoolManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
        subId: "",
        columns: [
          {
            label: "School Name",
            field: "schoolname",
            sort: "asc",
            width: "24%",
          },
          {
            label: "Address",
            field: "address",
            sort: "asc",
            width: "20%",
          },
          {
            label: "School Contact",
            field: "contacts",
            sort: "asc",
            width: "15%",
          },
          {
            label: "Enrolment Key",
            field: "enrolmentkey",
            sort: "asc",
            width: "50%",
          },
        ],
        rows: [],
        options: []
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  
  componentDidMount() {
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData(){
    AdminService.get_subs_plans()
    .then((response) => {
      this.setState({ options: response});
    });
    AdminService.get_all_schools()
    .then((response) => {
      this.setState({ rows: response })
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var data = {
        schoolName: event.target.schoolName.value,
        address: event.target.schoolAddress.value,
        contacts: event.target.schoolContactNumber.value,
        firstname: event.target.personName.value,
        lastname: event.target.surname.value,
        email: event.target.email.value,
    }

    var subData ={
      schoolId:"2",
      subscriptionid:this.state.subId,
      subscriptiondate:Date.now()
    }


    AdminService.post_new_school(data).then((response)=>{
        if(response === undefined){
          alert('School creation failed');
        }else{
          console.log(response);
          alert(response.message);
          document.getElementById("sibs").reset();
          this.getDashData();
        //   AdminService.subscribe_school(subData).then((response)=>{
        //     console.log(response);
        //     if(response === undefined){
        //       alert('School subscription failed');
        //     }else{
        //       alert(response.message);
        //       document.getElementById("sibs").reset();
        //       this.getDashData();
        //     }
        // })
      }
    });   
  }

  handleDropdownChange(event) {
    this.setState({subId: event.target.value });
    console.log(this.state.subId);
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />
            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <p style={{ padding: "10px",fontSize:"16px" }} >
                      School Management
                    </p>
                  </div>
                </nav>
              </div>
              <section className = "row" id="content" style={{ paddingTop: "7%" }}>
                <div className="container col s12 m6 6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12" style={{padding:"20px"}}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container col s12 m6 6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                      <h4 className="header2">Add School</h4>
                      <form onSubmit={this.handleSubmit} id="sibs">
                      <div className="row">
                        <div className="col s12">
                          <div className="row">
                            <div className="input-field col s4">
                              <input id="schoolName" type="text" name="schoolName"></input>
                              <label htmlFor="schoolName">School Name</label>
                            </div>
                            <div className="input-field col s4">
                              <input id="schoolAddress" type="text" name="schoolAddress"></input>
                              <label htmlFor="schoolAddress">School Address</label>
                            </div>
                            <div className="input-field col s4">
                              <input id="schoolContactNumber" type="number" name="schoolContactNumber"></input>
                              <label htmlFor="schoolContactNumber">Contact Number</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                              <input id="personName" type="text" name="personName"></input>
                              <label htmlFor="personName">Contact Person Name</label>
                            </div>
                            <div className="input-field col s4">
                              <input id="surname" type="text" name="surname"></input>
                              <label htmlFor="surname">Surname</label>
                            </div>
                            <div className="input-field col s4">
                              <input id="email" type="email" name="email"></input>
                              <label htmlFor="email">Email</label>
                            </div>
                          </div>

                          {/* <div className="row">
                            <div className="input-field col s6" >

                            <select name="sub" defaultValue={this.state.subId}   onChange={this.handleDropdownChange}>                              
                              {this.state.options.map((optionField, i) =>  (
                                <option key={i} value={optionField.subscriptionId}>{optionField.subscriptionname}</option> 
                            
                              ))}
                            </select>
                            <label htmlFor="sub">Subcription Package</label>
                            </div>
                          </div> */}
                        </div>
                          <div className="row">
                            <div className="input-field col s6 offset-s6">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              </div>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolManagement);
