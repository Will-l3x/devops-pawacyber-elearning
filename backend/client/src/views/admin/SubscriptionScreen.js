import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import M from "materialize-css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Pricing from "../../components/pricing";

export class SubscriptionScreen extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  state = {
    plans: [
      {
        title:"STARTER",
        description:" Best plan for individual students",
        price:"-", 
        frequency:"Monthly", 
        bestOffer:false, 
        features:["Enquire Now"]
      },
      {
        title:"MEDIUM",
        description:" Best plan for individual students",
        price:"-", 
        frequency:"Monthly", 
        bestOffer:false, 
        features:["Enquire Now"]
      },
      {
        title:"COMPLETE",
        description:"Must have for large schools",
        price:"-", 
        frequency:"Yearly", 
        bestOffer:true, 
        features:["Enquire Now"]
      },
    ],
  };

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar/>
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                   
                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <Link
                      style={{ marginTop: "4%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Subscription Management
                    </Link>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      data-target="dropdown1"
                      style={{ marginTop: "3%", marginRight: "2%" }}
                    >
                      <i className="material-icons">settings</i>
                    </Link>
                    <ul
                      id="dropdown1"
                      className="dropdown-content"
                      style={{
                        minWidth: "200px",
                        whiteSpace: "nowrap",
                        opacity: 1,
                        display: "none",
                      }}
                    >
                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Starter
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Medium
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="#!"
                          data-target="modal1"
                          className="grey-text modal-trigger text-darken-2"
                        >
                          <i className="material-icons ">create</i>
                          Complete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <section id="content" style={{ marginBottom: 0 }}>
                <div className="container" style={{ paddingTop: "7%" }}>
                  <div id="pricing" className="cards-2 sect-learn">
                    <div className="container">
                      <div className="row">

                      <div className="col s12">
                        {this.state.plans.map((plan, i) => (
                          <Pricing key ={i} plan={plan}></Pricing>
                        ))}
                      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);
