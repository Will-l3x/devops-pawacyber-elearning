import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {AdminService} from '../../services/admin';

export class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        columns: [
          {
            label: "Package Name",
            field: "subscriptionname",
            sort: "asc",
            width: "24%",
          },
          {
            label: "Starting Grade",
            field: "mingrade",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Ending Grade",
            field: "maxgrade",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Price",
            field: "price",
            sort: "asc",
            width: "15%",
          },
          {
            label: "Description",
            field: "subscriptiondesc",
            sort: "asc",
            width: "15%",
          },
          {
            label: "Action",
          },
        ],
        rows: [],
      
    };
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
        console.log(response);
      this.setState({ rows: response});
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var data = {
      subscriptionname: event.target.subscriptionname.value,
      subscriptiondesc: event.target.subscriptiondesc.value,
      mingrade: event.target.mingrade.value,
      maxgrade: event.target.maxgrade.value,
      price: event.target.price.value,
    }
    AdminService.post_new_plan(data).then((response)=>{
      if(response===undefined){
        alert(response.message);
      }else{
        alert(response.message);
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    })
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
                <nav className="navbar nav-extended" style={{ position: "fixed"}} >
                  <div className="nav-content">
                    <p style={{padding:"10px", fontSize:"16px"}} >
                      Manage Subscriptions Plans
                    </p>
                  </div>
                </nav>
              </div>
              <div>
              <section  className = "row" id="content" style={{ paddingTop: "7%" }}>
                <div className="container  col s12 m6 6">
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
                      <div className="modal-content">
                        <h4 className="header2">Add Subscription Plan</h4>
                        <form onSubmit={this.handleSubmit} id="sibs">
                          <div className="row">
                            <div className="col s12">
                              <div className="row">
                                <div className="input-field col s4">
                                  <input id="subscriptionname" type="text" name="subscriptionname"></input>
                                  <label htmlFor="subscriptionname">Package Name</label>
                                </div>
                                <div className="input-field col s8">
                                  <input id="subscriptiondesc" type="text" name="subscriptiondesc"></input>
                                  <label htmlFor="subscriptiondesc">Short Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                  <input id="mingrade" type="number" name="mingrade"></input>
                                  <label htmlFor="mingrade">Starting Grade</label>
                                </div>
                                <div className="input-field col s4">
                                  <input id="maxgrade" type="number" name="maxgrade"></input>
                                  <label htmlFor="maxgrade">Ending Grade</label>
                                </div>
                                <div className="input-field col s4">
                                  <input id="price" type="number" name="price"></input>
                                  <label htmlFor="price">Price</label>
                                </div>
                              </div>
                            </div>
                              <div className="row">
                                <div className="input-field col s6 offset-s6">
                                  <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
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
                </div>
              </section>
              </div>
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
)(SubscriptionScreen);
