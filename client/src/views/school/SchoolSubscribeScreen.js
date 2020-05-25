import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import M from "materialize-css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Pricing from "../../components/pricing";
import store from "../../config/store";

export class SchoolSubscribeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      plans: [
        {
          title: "STARTER",
          description: " Best plan for individual students",
          price: "-",
          frequency: "Monthly",
          bestOffer: false,
          features: ["Enquire Now"],
        },
        {
          title: "MEDIUM",
          description: " Best plan for individual students",
          price: "-",
          frequency: "Monthly",
          bestOffer: false,
          features: ["Enquire Now"],
        },
        {
          title: "COMPLETE",
          description: "Must have for large schools",
          price: "-",
          frequency: "Yearly",
          bestOffer: true,
          features: ["Enquire Now"],
        },
      ],
    };
  }
  componentDidMount() {
    M.AutoInit();
    console.log(store.getState().school.course);
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar />
            <div className="section" style={{ paddingBottom: 0 }}>
              <section id="content" style={{ marginBottom: 0 }}>
                <div className="container" style={{ paddingTop: "7%" }}>
                  <div id="pricing" className="cards-2 sect-learn">
                    <div className="container">
                      <div className="row">
                        <div className="col s12">
                          {this.state.plans.map((plan, i) => (
                            <Pricing key={i} plan={plan}></Pricing>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolSubscribeScreen);
