import React, { Component } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import ReactPlayer from "react-player";
import {AdminService} from '../../services/admin';

import "../../assets/css/styles.css";

import headerImg from "../../assets/images/girl.png";
import kigsImg from "../../assets/images/gids.png";
import servicesImg1 from "../../assets/images/services-icon-1.svg";
import servicesImg2 from "../../assets/images/services-icon-2.svg";
import servicesImg3 from "../../assets/images/services-icon-3.svg";
import Pricing from "../../components/pricing";
import OuterHeader from "../../components/outerHeader";
import OuterFooter from "../../components/outerFooter";

export class HomeScreen extends Component {
  state = {
    plans: [],
    url:"https://youtu.be/HUEFHTDqbqo"
  };

  componentDidMount() {
    this.getDashData();
  }

  getDashData(){
    AdminService.get_subs_plans()
    .then((response) => {
        console.log(response);
      this.setState({ plans: response});
    });
  }


  render() {
    return (
      <div>
<OuterHeader></OuterHeader>

<div className="content-pawa">
        <header id="welcome" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row mt-1">
                <div className="col s12 m6">
                  <div className="text-container">
                    <h1>
                      <span className="turquoise">PawaCyber School</span>
                    </h1>
                    <h5 style={{marginTop:"-5px"}}>Learn Practice Achieve</h5>
                    <p className="p-large">
                      Just the virtual classroom you were looking for!. Get
                      started now with PawaCyber School e-learning to experience next gen
                      education!
                    </p>
                    <Link
                      className="btn-solid-lg page-scroll"
                      rel="noopener noreferrer"
                      to="/login"
                    >
                      GET STARTED
                    </Link>
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="image-container">
                    <img
                      className="img-fluid"
                      src={headerImg}
                      alt="alternative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="services" className="cards-1">
          <div className="row container">
            <div className="row">
              <div className="col s12">
                <h4>Valued Services</h4>
                <p className="p-heading p-large">
                  We serve both teachers and learners in Primary and Secondary
                  education sectors by allowing timeous sharing of learning
                  resources between the learners and the teachers
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 card-services">
                <div className="card ">
                  <img
                    className="card-image"
                    src={servicesImg1}
                    alt="alternative"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Learners</h4>
                    <p>
                      Learners can access their learning materials, homeworks
                      and tests through a well designed easy to use students
                      portal. Videos too are available!
                    </p>
                  </div>
                </div>

                <div className="card">
                  <img
                    className="card-image"
                    src={servicesImg2}
                    alt="alternative"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Teachers</h4>
                    <p>
                      Teachers through their elite forum can send and receive
                      student work. The service comes with an automated way to
                      view perfomance and capture remedal records
                    </p>
                  </div>
                </div>

                <div className="card">
                  <img
                    className="card-image"
                    src={servicesImg3}
                    alt="alternative"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Educational Solutions</h4>
                    <p>
                      You are so much loved and your experience is what matters
                      the most. We can develop any educational solution that you
                      may thing of for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-2 sect-learn" >
          <div className="container">
          <div className="row mt-1">
                <div className="col s12 m6">
                <div className="image-container">
                  <img
                    className="img-fluid"
                    src={kigsImg}
                    alt="alternative"
                  />
                </div>
              </div>
              <div className="col s12 m6">
                <div className="text-container" style={{paddingLeft:"0px"}}>
                  <h2  style={{fontSize:"28px",fontWeight:"bold"}}>Learning Resources<br/>Wherever You are</h2>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-check"></i>
                   
                        For sure we know you know what's best for your brilliant
                        child
                    
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                        We are here for one purpose, to deliver that best to
                        your child
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                        Everyone will be pleased from students to teachers to
                        parents
                    </li>
                  </ul>
                  <Link className="btn-solid-reg" rel="noopener noreferrer" to="/register">
                    REGISTER NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-2 sect-learn" >
          <div className="container">
          <div className="row mt-1">
              <div className="col s12 m6">
                <div className="text-container" style={{paddingLeft:"0px"}}>
                  <h2  style={{fontSize:"28px",fontWeight:"bold", textAlign:"right"}}>Video Preview <br/>HD Visuals for everyone</h2>
                  <ul className="list-unstyled li-space-lg" style={{textAlign:"right"}}>
                    <li className="media">
                      <i className="fas fa-check"></i>
                        HD Quality videos, auudible, compressed you name it
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col s12 m6">
                <div className="image-container">
                  <div className="cards-1 sect-learn">
                    <div className="container">
                      <div className="row">
                        <div className="col s12">
                            <div className="card-body">
                            <ReactPlayer url={this.state.url} controls={true} />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="pricing" className="cards-2 sect-learn">
          <div className="container">
            <div className="row">
              <div className="col s12">
              <h4>Multiple Pricing Options</h4>
                <p className="p-heading p-large">
                  We've prepared pricing plans for all budgets so you can get
                  started right away. They're great for absolutely everyone
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                {this.state.plans.map((plan, i) => (
                  <Pricing key ={i} plan={plan}></Pricing>
                ))}
                </div>
            </div>
          </div>
        </div>
        <OuterFooter></OuterFooter>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
